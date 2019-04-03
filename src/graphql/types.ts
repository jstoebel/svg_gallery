import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    uploads: [File]
  }
  type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

export default typeDefs;