import express from 'express';
const app = express();
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const port = process.env.port || 3000; // default port to listen

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
