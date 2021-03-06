import fs from 'fs';
import path from 'path';
const appRoot = require('app-root-path').toString();
import Image from '../models/Image';
import kue from 'kue'
import uuidv4 from 'uuid/v4'

const jobs = kue.createQueue({
  redis: {
    host: 'localhost',
    port: 6379,
  }
});

const saveImage = (imagePath: string, rStream: fs.ReadStream) => {

  console.log('hello from saveImage');  
  return new Promise((resolve, reject) => {
    const wStream = fs.createWriteStream(imagePath)
    const stream = rStream.pipe(wStream)
    stream.on('finish', resolve)
    stream.on('error', reject)
  })
} 

export async function uploadFile(parent, { file, altText, title }) {
  console.log('hello from uploadFile mutation resolver', arguments);
  
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

  const imageId = uuidv4();
  const imageName = imageId + '.jpg'
  const imagePath = path.join('uploads', imageName);
  const fullImagePath = path.join(appRoot.toString(), 'public', imagePath)
  const fileSave = saveImage(fullImagePath, createReadStream())

  // 3. Record the file upload in your DB.
  const recordSave = Image.create({
    imagePath,
    mimetype,
    encoding,
    altText,
    title,
  })
  const promises: [Promise<{}>, Promise<Image>] = [fileSave, recordSave]
  return Promise.all(promises)
          .then(async ([_, image]) => {
            // process and return svg
            const job = jobs.create('svg_trace', {imagePath: fullImagePath});
            job.on( 'progress', (progress: number, svg: string) => {
              console.log( ' Job complete' );
              image.update({svg}).then(() => {
                console.log('updated image with svg');
              }).catch((err) => {
                console.log(err);
              })
            }).on( 'error', function () {
              console.log( 'Job failed' );
            }).on('complete', (result) => {
              console.log('job complete', result);
              
            })

            job.save();

            return { filename, mimetype, encoding, altText, imagePath, title };
         }).catch((error) => {
           console.log(error)
           throw new Error(error)
         })
}
