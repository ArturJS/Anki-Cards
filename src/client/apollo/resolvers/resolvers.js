import { cardsQueries, cardsMutations } from './modules/cards';
import { desksQueries, desksMutations } from './modules/desks';

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
