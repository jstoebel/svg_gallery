import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Hero {
    _id: ID
    name: String!
    alias: String!
  }
  type Query {
    allHeros(heroName: String!): [Hero]
  }
`;

export default typeDefs;