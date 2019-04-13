import {Sequelize} from 'sequelize-typescript';
import Image from './models/Image'
import logger from '../logger'

// help setting up postgres locally https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3

let sequelize;
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize('svg_gallery', 'svg_gallery', null, {
    host: 'localhost',
    dialect: 'postgres',
  });
}

sequelize.addModels([Image])

sequelize
  .authenticate()
  .then(() => {
    logger.info('Database connection has been established successfully.');
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

export default sequelize;