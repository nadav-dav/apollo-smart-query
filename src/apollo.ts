import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { read, write } from './smartQuery';
import { resolvers } from './resolvers';

let defaultOptions = {
  watchQuery: {
    context: {
      read,
    },
  },
  mutate: {
    context: {
      read,
      write,
    },
  },
};

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs: gql`
    type Query {
      counter: Int!
    }
    type Mutation {
      addOne: Boolean
    }
  `,
  defaultOptions,
  resolvers,
});
