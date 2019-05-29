import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type File {
    id: Int!
    title: String!
    imagePath: String!
    mimetype: String!
    encoding: String!
    altText: String!
    svg: String
  }
  type Query {
    uploads: [File!]!
    upload(id: Int): File!
  }
  type Mutation {
    uploadFile(file: Upload!, altText: String!, title: String!): File!
    updateFile(id: Int!): File!
  }
`;

export default typeDefs;