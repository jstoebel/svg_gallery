import { uploads } from './queries'
import {uploadFile} from './mutations'

export const resolvers = {
  Query: {
    uploads,
  },
  Mutation: {
    uploadFile
  },
};

export default resolvers;

