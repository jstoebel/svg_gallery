import fs from 'fs';
import path from 'path';
import Image from '../models/Image';

const saveImage = (imagePath: string, rStream: fs.ReadStream) => {

  console.log('hello from saveImage');
  console.log(rStream);
  
  return new Promise((resolve, reject) => {
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
        filename: String,
        mimetype: String,
        encoding: String,
      } = await file;

      // 1. Validate file metadata.
      if (!mimetype.match(/image/)) {
        throw new Error('Uploaded file is not an image!')
      }

      const imagePath = `uploads/${filename}`
      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html
      const fileSave = saveImage(imagePath, createReadStream())

      const altText = filename; // FIXME

      // 3. Record the file upload in your DB.
      const recordSave = Image.build({
        imagePath,
        mimetype,
        encoding,
        altText,
      }).save()

      Promise.all([fileSave, recordSave])
             .then((_values) => {
               console.log('Promise.all successful!');
                
               return { filename, mimetype, encoding, altText };
             }).catch((error) => {
               throw new Error(error)
             })
      // 4. Get SVG outline and update DB -> after create hook
    }
},
};

export default resolvers;

