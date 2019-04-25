import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type File {
    id: Int!
    imagePath: String!
    mimetype: String!
    encoding: String!
    altText: String!
    svg: String
  }
  type Query {
    uploads: [File!]!
  }
  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

export default typeDefs;