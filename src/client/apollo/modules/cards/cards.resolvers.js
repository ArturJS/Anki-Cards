import {
  createReaderResolver,
  createWriterResolver,
  getAllByType
} from 'apollo-client-resolvers';
import cardsGql from './cards.gql';

export const cardsQueries = {
  cards: createReaderResolver({
    idField: 'deskId',
    typename: 'Card'
  })
};

export const cardsMutations = {
  bulkAddCards: createWriterResolver({
    updater({ variables: { cards } }) {
      return {
        query: cardsGql,
        data: {
          cards: cards.map(card => ({
            ...card,
            __typename: 'Card'
          }))
        }
      };
    }
  }),

  addCard: createWriterResolver({
    selector({ cacheData, variables }) {
      const { deskId } = variables.card;

      return getAllByType({ data: cacheData, type: 'Card' }).filter(
        card => card.deskId === deskId
      );
    },
    updater({ selectedData: cards, variables: { card } }) {
      return {
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
      };
    }
  }),

  removeCard: createWriterResolver({
    selector({ cacheData, variables: { id } }) {
      const allCards = getAllByType({ data: cacheData, type: 'Card' });
      const cardToRemove = allCards.find(card => card.id === id);

      return {
        cardToRemove,
        cardsForRelatedDesk:
          cardToRemove &&
          allCards.filter(card => card.deskId === cardToRemove.deskId)
      };
    },
    updater({
      selectedData: { cardToRemove, cardsForRelatedDesk },
      variables: { id }
    }) {
      if (!cardToRemove) {
        console.error(`cardToRemove with id="${id}" not found!`);

        return;
      }

      return {
        query: cardsGql,
        variables: {
          deskId: cardToRemove.deskId
        },
        data: {
          cards: cardsForRelatedDesk.filter(card => card.id !== id)
        }
      };
    }
  })
};
