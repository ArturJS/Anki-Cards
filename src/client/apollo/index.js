import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import gql from 'graphql-tag';

const desksGql = gql`
  {
    desks @client {
      id
      title
    }
  }
`;

const resolvers = {
  Mutation: {
    addDesk: (_, { desk }, { cache }) => {
      const { desks } = cache.readQuery({
        query: desksGql
      });

      cache.writeQuery({
        query: desksGql,
        data: {
          desks: [
            ...desks,
            {
              ...desk,
              __typename: 'Desk'
            }
          ]
        }
      });

      return null;
    },
    removeDesk: (_, { id }, { cache }) => {
      const { desks } = cache.readQuery({
        query: desksGql
      });

      cache.writeQuery({
        query: desksGql,
        data: {
          desks: desks.filter(desk => desk.id !== id)
        }
      });

      return null;
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

              type Mutation {
                  addDesk(desk: Desk): Boolean
                  removeDesk(id: Int!): Boolean
              }
      
              type Query {
                desks: [Desk]
              }
            `
      })
    ])
  };
};
