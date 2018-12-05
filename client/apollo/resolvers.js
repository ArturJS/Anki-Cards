import { cardsQueries, cardsMutations } from './modules/cards/cards.resolvers';
import { desksQueries, desksMutations } from './modules/desks/desks.resolvers';

const resolvers = {
  Query: {
    ...cardsQueries,
    ...desksQueries
  },
  Mutation: {
    ...cardsMutations,
    ...desksMutations
  }
};

export default resolvers;
