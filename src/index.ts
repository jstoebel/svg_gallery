require('dotenv').config()
import express from 'express';
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'
import './db/database';
import { ApolloServer } from 'apollo-server-express';
import cors from './middleware/cors'

const {port} = process.env

const app = express();
const apolloServer = new ApolloServer({ 
    typeDefs,
    resolvers,
    uploads: {
        // Limits here should be stricter than config for surrounding
        // infrastructure such as Nginx so errors can be handled elegantly by
        // graphql-upload:
        // https://github.com/jaydenseric/graphql-upload#type-uploadoptions
        maxFileSize: 10000000, // 10 MB
        maxFiles: 20
    }
});
apolloServer.applyMiddleware({ app })

if (process.env.NODE_ENV === 'development') {
  console.log('allowing cors');
  app.use(cors)
}

// start the Express server
app.listen( { port }, () => {
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server ready port: ${port}, path: ${apolloServer.graphqlPath}`)
} );
