import { Sequelize } from 'sequelize';

const dbConnection = new Sequelize({
  dialect: 'sqlite',
  storage: './src/db/database.sqlite'
});

console.log('syncing database...');
dbConnection.sync().then(() => console.log('database synced!'));

export default dbConnection;