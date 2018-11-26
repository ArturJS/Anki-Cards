import { cardsQueries, cardsMutations } from './modules/cards';
import { desksMutations } from './modules/desks';

const resolvers = {
  Query: {
    ...cardsQueries
  },
  Mutation: {
    ...cardsMutations,
    ...desksMutations
  }
};

export default resolvers;
