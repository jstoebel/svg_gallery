import mongoose from 'mongoose';
import 'mongoose-attachments'
import attachments from 'mongoose-attachments-localfs'
import path from 'path'

export type ImageModel = mongoose.Document & {
  name: string,
}

const ImageSchema = new mongoose.Schema({
  fileName: {type: String, unique: true}
})

ImageSchema.plugin(attachments, {
  directory: '/Users/jstoebel/repos/svg_gallery/svg_gallery_api/public/uploads',
  storage : {
    providerName: 'localfs'
  },
  properties: {
    image: {
      styles: {
        original: {
          // keep the original file
        },
        thumb: {
          thumbnail: '100x100^',
          gravity: 'center',
          extent: '100x100',
          '$format': 'jpg'
        },
        detail: {
          resize: '400x400>',
          '$format': 'jpg'
        }
      }
    }
  }
})

ImageSchema.virtual('detail_img').get(function() {
  return path.join('detail', path.basename(this.image.detail.path));
});
ImageSchema.virtual('thumb_img').get(function() {
  return path.join('thumb', path.basename(this.image.thumb.path));
});

const Image = mongoose.model('Image', ImageSchema)

export default Image