// example resolver
/**
 *  name(args are root, args, context, info) {
      return 'Jacob';
    },
 */

export const resolvers = {
  Query: {
    uploads: () => {
      // Return the record of files uploaded from your DB or API or filesystem.
    }
  },
  Mutation: {
    async uploadFile(parent, { file }) {
      const { stream, filename, mimetype, encoding } = await file;

      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )

      return { filename, mimetype, encoding };
    }
},
};

export default resolvers;

