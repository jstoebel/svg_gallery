import Sequelize, { Model } from 'sequelize';
import dbConnection from '../config/database';

class Image extends Model {}

Image.init({
  imageName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  altText: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  svg: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
}, {sequelize: dbConnection});
