import { Sequelize } from 'sequelize';

const dbConnection = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/database.sqlite'
});

if (process.env.NODE_ENV == 'development') {
  console.log('syncing database...');
  dbConnection.sync({force: true}).then(() => console.log('database synced!'));
}


export default dbConnection;