import { ApolloServer } from 'apollo-server';
import { RedisCache } from 'apollo-server-cache-redis';

import { sequelize } from './db/index.js';

import resolvers from './resolvers.js';
import typeDefs from './schema.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,

  cache: (process.env.REDIS_URL || process.env.REDIS_HOST)
    && new RedisCache(process.env.REDIS_URL || {
      port: process.env.REDIS_PORT && Number(process.env.REDIS_HOST),
      host: process.env.REDIS_HOST,
      family: process.env.REDIS_FAMILY,
      path: process.env.REDIS_PATH,
      db: process.env.REDIS_DB,
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
    }),
});

sequelize.sync()
  .then(() => server.listen())
  .then(({ url }) => console.log(`Server ready at ${url}`));
