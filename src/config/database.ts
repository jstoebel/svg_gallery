import { Sequelize } from 'sequelize';

const dbConnection = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export default dbConnection;