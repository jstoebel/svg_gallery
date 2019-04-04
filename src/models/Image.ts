import Sequelize, { Model } from 'sequelize';
import dbConnection from '../config/database';

class Image extends Model {}

Image.init({
  imagePath: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mimetype: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  encoding: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  altText: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  svg: {
    type: Sequelize.TEXT,
    allowNull: true,
  }
}, {sequelize: dbConnection});

export default Image