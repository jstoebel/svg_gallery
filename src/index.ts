import express from 'express';
const app = express();
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import mongoose from 'mongoose';


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

// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017';
mongoose.connect(mongoUrl).then(() => { 
  console.log('connected to MongoDB');
  
}).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  process.exit();
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

console.log('testing Image');

import Image from './models/Image'

const i = new Image({name: 'newFile'});
i.save()
  .then(() => console.log('saved!'))



