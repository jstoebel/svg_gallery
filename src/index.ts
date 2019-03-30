import express from 'express';
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'
import './config/database';
import { ApolloServer } from 'apollo-server-express';

const port = process.env.port || 3000; // default port to listen

const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app })

// start the Express server
app.listen( { port }, () => {
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
} );
