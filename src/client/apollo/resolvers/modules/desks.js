import cardsGql from '~/apollo/queries/cards.gql';
import desksGql from '~/apollo/queries/desks.gql';

export const desksMutations = {
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
    const updateQueries = (desks, deskId) => {
      cache.writeQuery({
        query: desksGql,
        data: {
          desks: desks.filter(desk => desk.id !== id)
        }
      });

      cache.writeQuery({
        query: cardsGql,
        variables: {
          deskId: id
        },
        data: {
          cards: []
        }
      });
    };
    const removeFromCache = (desks, deskId) => {
      const cardsToRemove = Object.entries(cache.data.data)
        .filter(([key]) => key.includes('Card:'))
        .map(([, card]) => card)
        .filter(card => card.deskId === id);
      const deskToRemove = desks.find(desk => desk.id === id);
      const entitiesToRemove = [...cardsToRemove, deskToRemove];

      entitiesToRemove.forEach(item => {
        const itemCacheId = `${item.__typename}:${item.id}`;

        cache.data.delete(itemCacheId);
      });
    };

    updateQueries(desks, id);
    removeFromCache(desks, id);

    return null;
  }
};
