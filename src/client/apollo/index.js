import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

const resolvers = {
  Query: {
    desks: (_, { id }, { cache }) => {
      console.log('cache.data ', cache.data);

      return [
        {
          id: 1,
          title: 'Apollo desk 123'
        }
      ];
    }
  }
};

const cache = new InMemoryCache();
const defaultClientState = {
  desks: []
};

if (process.browser) {
  persistCache({
    cache,
    storage: window.localStorage
  }).catch(error => {
    console.error('Error restoring Apollo cache', error);
  });
}

export default ctx => {
  return {
    cache,
    link: ApolloLink.from([
      withClientState({
        cache,
        defaults: defaultClientState,
        resolvers,
        typeDefs: `
              type Desk {
                id: Int!
                title: String!
              }
      
              type Query {
                desks: [Desk]
              }
            `
      })
    ])
  };
};
