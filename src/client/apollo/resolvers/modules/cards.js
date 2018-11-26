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
  }
};
