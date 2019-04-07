import {Sequelize} from 'sequelize-typescript';
import Image from './models/Image'
const appRoot = require('app-root-path').toString();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: appRoot + '/db/database.sqlite',
});

sequelize.addModels([Image])

// Image.create({
//   imagePath: '/Users/jstoebel/repos/svg_gallery/svg_gallery_api/uploads/berea_shirt.jpg',
//   mimetype: 'whatever',
//   encoding: 'blah',
//   altText: 'adsa',
// }).then((image) => {
//   console.log('success!');
//   console.log(image);
// }).catch(err => {
//   console.log(err);
// })

export default sequelize;