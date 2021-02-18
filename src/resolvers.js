import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';

export default {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,

  Query: {
    hello: () => ({ hello: "world" }),
  },
};
