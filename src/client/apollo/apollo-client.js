import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import resolvers from './resolvers';

const cache = new InMemoryCache();
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

export default ctx => {
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
