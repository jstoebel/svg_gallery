import express from 'express';

import graphqlHTTP from 'express-graphql';
import schema from './schema';
import dbConnection from './config/database';
import Image from './models/Image'

// test database connection

dbConnection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

const port = process.env.port || 3000; // default port to listen

const app = express();

app.use('/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    context: {
      userId: 1,
    }
  })
);

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
