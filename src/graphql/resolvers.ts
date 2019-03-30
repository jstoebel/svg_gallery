// example resolver
/**
 *  name(args are root, args, context, info) {
      return 'Jacob';
    },
 */

export const resolvers = {
  Query: {
    allHeros(root, {heroName}) {
      return([
        {_id: 1, name: 'first hero', alias: 'first alias'},
        {_id: 2, name: 'second hero', alias: 'second alias'}
      ])
    },
  },
};

export default resolvers;

