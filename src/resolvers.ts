import { Resolvers } from '@apollo/client';
import { createVar } from './smartQuery';

const timer = createVar(1);
export const resolvers: Resolvers = {
  Query: {
    timer: (parent, args, { read }) => {
      return read(timer);
    },
  },
  Mutation: {
    addOne: (parent, args, { read, write }) => {
      let currentValue = read(timer);
      write(timer, currentValue + 1);
      return true;
    },
  },
};
