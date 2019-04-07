import {Sequelize} from 'sequelize-typescript';
import Image from './models/Image'
const appRoot = require('app-root-path').toString();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: appRoot + '/db/database.sqlite',
});

sequelize.addModels([Image])

Image.create({
  imagePath: '/Users/jstoebel/repos/svg_gallery/svg_gallery_api/uploads/picsum.jpg',
  mimetype: 'whatever',
  encoding: 'blah',
  altText: 'adsa',
}).then((image) => {
  return image;
})

// Image
//   .findAll()
//   .then((images) => {
//     console.log(`there are ${images.length} record(s)`);
//     console.log(JSON.stringify(images));
//     // images.forEach((image: Image) => {
//     //   console.log(image.imagePath);
      
//     // })
    
//   }).catch((err) => {
//     console.log(err);
//     throw new Error(err)
//   });



export default sequelize;