import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Image {
    id: ID!
    path: String!
    fileName: String!
    mimetype: String!
    altText: String!
    svg: String!
  }
  type Query {
    uploads: [Image]
  }
  type Mutation {
    singleUpload(image: Upload!): Image!
    multipleUpload(images: [Upload!]!): [Image!]!
  }
`;

export default typeDefs;