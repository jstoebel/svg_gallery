import fs from 'fs';
import path from 'path';
const appRoot = require('app-root-path').toString();
import Image from '../models/Image';
import traceImage from '../lib/traceImage'
import kue from 'kue'

const jobs = kue.createQueue();

const saveImage = (imagePath: string, rStream: fs.ReadStream) => {

  console.log('hello from saveImage');  
  return new Promise((resolve, reject) => {
    console.log('saveImage promise');
    const wStream = fs.createWriteStream(imagePath)
    const stream = rStream.pipe(wStream)
    stream.on('finish', resolve)
    stream.on('error', reject)
  })
} 

export async function uploadFile(parent, { file }) {
  const { createReadStream, filename, mimetype, encoding }: {
    createReadStream: Function,
    filename: string,
    mimetype: string,
    encoding: string,
  } = await file;

  // 1. Validate file metadata.
  if (!mimetype.match(/image/)) {
    throw new Error('Uploaded file is not an image!')
  }

  const imagePath = path.join(appRoot.toString(), 'uploads', filename);
  // 2. Stream file contents into cloud storage:
  // https://nodejs.org/api/stream.html
  const fileSave = saveImage(imagePath, createReadStream())

  const altText = filename; // FIXME

  // 3. Record the file upload in your DB.
  const recordSave = Image.create({
    imagePath,
    mimetype,
    encoding,
    altText,
  })
  const promises: [Promise<{}>, Promise<Image>] = [fileSave, recordSave]
  return Promise.all(promises)
          .then(async ([_, image]) => {
            // process and return svg
            const job = jobs.create('svg_trace', {imagePath: image.imagePath});
            job.on( 'complete', function () {
              console.log( ' Job complete' );
            } ).on( 'failed', function () {
              console.log( ' Job failed' );
            } )

            job.save();

            jobs.process('svg_trace', 1, async (job, done) => {
              console.log('starting to process');
              const svg = await traceImage(job.data.imagePath)
              image.update({svg}).then((image) => {
                console.log('image updated');
                done();
              }).catch((err) => {
                console.log(err);
                done();
              })
            })

            return { filename, mimetype, encoding, altText };
         }).catch((error) => {
           console.log(error)
           throw new Error(error)
         })
  // 4. Get SVG outline and update DB -> after create hook
}