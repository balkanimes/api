import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers.js';
import typeDefs from './schema.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
