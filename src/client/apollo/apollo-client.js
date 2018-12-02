import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import resolvers from './resolvers';

export default ctx => {
  class AppCache extends InMemoryCache {
    constructor({ getApolloClient, ...restParams }) {
      super(restParams);

      this._appMeta = {
        getApolloClient
      };
    }

    getApolloClient() {
      return this._appMeta.getApolloClient();
    }
  }

  const cache = new AppCache({
    getApolloClient: () => ctx.app.apolloProvider.defaultClient
  });
  const defaultClientState = {
    desks: [],
    cards: []
  };

  if (process.browser) {
    persistCache({
      cache,
      storage: window.localStorage
    }).catch(error => {
      console.error('Error restoring Apollo cache', error);
    });
  }

  return {
    cache,
    link: ApolloLink.from([
      withClientState({
        cache,
        defaults: defaultClientState,
        resolvers,
        typeDefs: `
              type Card {
                id: Int!
                deskId: Int!
                question: String!
                answer: String!
              }

              type Desk {
                id: Int!
                title: String!
              }

              type Mutation {
                  addDesk(desk: Desk): Boolean
                  removeDesk(id: Int!): Boolean
              }
      
              type Query {
                cards(deskId: Int): [Card]
                desks: [Desk]
              }
            `
      })
    ])
  };
};
