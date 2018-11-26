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

    return null;
  }
};
