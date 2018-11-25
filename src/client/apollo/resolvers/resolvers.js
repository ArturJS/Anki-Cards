import { desksMutations } from './modules/desks';

const resolvers = {
  Mutation: {
    ...desksMutations
  }
};

export default resolvers;
