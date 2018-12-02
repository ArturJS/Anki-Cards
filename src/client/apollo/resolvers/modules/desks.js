import {
  combineResolvers,
  createReaderResolver,
  createWriterResolver,
  getAllByType
} from 'apollo-client-resolvers';
import cardsGql from '~/apollo/queries/cards.gql';
import desksGql from '~/apollo/queries/desks.gql';

export const desksQueries = {
  desks: createReaderResolver({
    typename: 'Desk'
  })
};

export const desksMutations = {
  buldAddDesks: createWriterResolver({
    updater({ variables: { desks } }) {
      return {
        query: desksGql,
        data: {
          desks: desks.map(desk => ({
            ...desk,
            __typename: 'Desk'
          }))
        }
      };
    }
  }),

  addDesk: createWriterResolver({
    selector({ cacheData }) {
      return getAllByType({ data: cacheData, type: 'Desk' });
    },
    updater({ selectedData: desks, variables: { desk } }) {
      return {
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
      };
    }
  }),

  removeDesk: combineResolvers(
    // first remove related cards
    createWriterResolver({
      selector({ cacheData, variables: { id: deskId } }) {
        const allDesks = getAllByType({ data: cacheData, type: 'Desk' });

        return {
          deskToRemove: allDesks.find(desk => desk.id === deskId)
        };
      },
      updater({ selectedData: { deskToRemove }, variables: { id: deskId } }) {
        if (!deskToRemove) {
          return;
        }

        return {
          query: cardsGql,
          variables: {
            deskId
          },
          data: {
            cards: []
          }
        };
      }
    }),

    // and then remove desk by id
    createWriterResolver({
      selector({ cacheData, variables: { id: deskId } }) {
        const allDesks = getAllByType({ data: cacheData, type: 'Desk' });
        const deskToRemove = allDesks.find(desk => desk.id === deskId);

        return {
          allDesks,
          deskToRemove
        };
      },
      updater({
        selectedData: { allDesks, deskToRemove },
        variables: { id: deskId }
      }) {
        if (!deskToRemove) {
          return;
        }

        return {
          query: desksGql,
          data: {
            desks: allDesks.filter(desk => desk.id !== deskId)
          }
        };
      }
    })
  )
};
