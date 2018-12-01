import cardsGql from '~/apollo/queries/cards.gql';

// todo make apollo-client-resolvers npm module

// read operation
const createCacheReader = ({ idField, typename }) => (
  _,
  variables,
  { cache }
) => {
  const allItems = Object.entries(cache.data.data)
    .filter(([key]) => key.indexOf(`${typename}:`) === 0)
    .map(([, value]) => value);

  if (!variables || !variables[idField]) {
    return allItems;
  }

  const id = variables[idField];

  return allItems.filter(item => item[idField] === id);
};

export const cardsQueries = {
  cards: (_, { deskId }, { cache }) => {
    const allCards = Object.entries(cache.data.data)
      .filter(([key]) => key.indexOf('Card:') === 0)
      .map(([, value]) => value);

    if (!deskId) {
      return allCards;
    }

    return allCards.filter(card => card.deskId === deskId);
  }
};

export const cardsMutations = {
  bulkAddCards: (_, { cards }, { cache }) => {
    cache.writeQuery({
      query: cardsGql,
      data: {
        cards: cards.map(card => ({
          ...card,
          __typename: 'Card'
        }))
      }
    });

    return null;
  },

  addCard: (_, { card }, { cache }) => {
    const cards = Object.entries(cache.data.data)
      .filter(([key]) => key.indexOf('Card:') === 0)
      .map(([, value]) => value)
      .filter(({ deskId }) => deskId === card.deskId);

    cache.writeQuery({
      query: cardsGql,
      variables: {
        deskId: card.deskId
      },
      data: {
        cards: [
          ...cards,
          {
            ...card,
            __typename: 'Card'
          }
        ]
      }
    });

    return null;
  },

  removeCard: (_, { id }, { cache }) => {
    // todo use generic way to handle CRUD in mutations and queries
    const cards = Object.entries(cache.data.data)
      .filter(([key]) => key.includes('Card:'))
      .map(([, card]) => card);
    const cardToRemove = cards.find(card => card.id === id);

    if (!cardToRemove) {
      return null;
    }

    const { deskId } = cardToRemove;
    const cardsForRelatedDesk = cards.filter(card => card.deskId === deskId);

    cache.writeQuery({
      query: cardsGql,
      variables: {
        deskId: cardToRemove.deskId
      },
      data: {
        cards: cardsForRelatedDesk.filter(card => card.id !== id)
      }
    });

    const itemCacheId = `${cardToRemove.__typename}:${cardToRemove.id}`;

    cache.data.delete(itemCacheId);

    return null;
  }
};
