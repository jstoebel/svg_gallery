import {makeExecutableSchema} from 'graphql-tools';
import {resolvers} from './resolvers';

const typeDefs = `
  type Hero {
    _id: ID
    name: String!
    alias: String!
  }
  type Query {
    allHeros(heroName: String!): [Hero]
  }
`;

export default makeExecutableSchema({
  resolvers,
  typeDefs,
});
