import fs from 'fs';
import path from 'path';
const appRoot = require('app-root-path').toString();
import Image from '../db/models/Image';
import traceImage from '../lib/traceImage'
import kue from 'kue'

import logger from '../logger'


const jobs = kue.createQueue();

const saveImage = (imagePath: string, rStream: fs.ReadStream) => {

  logger.info('hello from saveImage');  
  return new Promise((resolve, reject) => {
    logger.info('saveImage promise');
    const wStream = fs.createWriteStream(imagePath)
    const stream = rStream.pipe(wStream)
    stream.on('finish', resolve)
    stream.on('error', reject)
  })
} 

export const resolvers = {
  Query: {
    uploads: () => {
      // Return the record of files uploaded from your DB or API or filesystem.
    }
  },
  Mutation: {
    async uploadFile(parent, { file }) {
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
                  logger.info( ' Job complete' );
                } ).on( 'failed', function () {
                  logger.info( ' Job failed' );
                } )

                job.save();

                jobs.process('svg_trace', 1, async (job, done) => {
                  logger.info('starting to process');
                  const svg = await traceImage(job.data.imagePath)
                  image.update({svg}).then((image) => {
                    logger.info('image updated');
                    done();
                  }).catch((err) => {
                    logger.info(err);
                    done();
                  })
                })

                return { filename, mimetype, encoding, altText };
             }).catch((error) => {
               logger.info(error)
               throw new Error(error)
             })
      // 4. Get SVG outline and update DB -> after create hook
    }
},
};

console.log('about to export resolvers');

export default resolvers;

