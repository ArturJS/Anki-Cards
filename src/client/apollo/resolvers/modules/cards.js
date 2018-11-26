import cardsGql from '~/apollo/queries/cards.gql';

export const cardsQueries = {
  cards: (_, { deskId }, { cache }) => {
    return [];
  }
};

export const cardsMutations = {
  addCard: (_, { card }, { cache }) => {
    const { cards } = cache.readQuery({
      query: cardsGql,
      variables: {
        deskId: card.deskId
      }
    });

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

    cache.writeQuery({
      query: cardsGql,
      variables: {
        deskId: cardToRemove.deskId
      },
      data: {
        cards: cards.filter(card => card.id !== id)
      }
    });

    const itemCacheId = `${cardToRemove.__typename}:${cardToRemove.id}`;

    cache.data.delete(itemCacheId);

    return null;
  }
};
