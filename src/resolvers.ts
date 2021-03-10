import { Resolvers } from '@apollo/client';
import { createVar } from './smartQuery';

const counter = createVar(0);

export const resolvers: Resolvers = {
  Query: {
    counter: (parent, args, { read }) => {
      return read(counter);
    },
  },
  Mutation: {
    addOne: (parent, args, { read, write }) => {
      let currentValue = read(counter);
      write(counter, currentValue + 1);
    },
  },
};
