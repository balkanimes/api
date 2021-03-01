import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';

export default {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,

  Query: {
    pipelines: (_, __, { dataSources }) => dataSources.db.getPipelines(),
    pipeline: (_, { id }, { dataSources }) => dataSources.db.getPipeline(id),
    entries: (_, __, { dataSources }) => dataSources.db.getEntries(),
    entry: (_, { id }, { dataSources }) => dataSources.db.getEntry(id),
    schema: (_, { provider }, { dataSources }) => [
      {
        name: "test.string",
        type: "string",
        description: "A string",
        required: true,
      },
      {
        name: "test.array",
        type: "string",
        array: true,
        description: "A string array",
      },
      {
        name: "test.number",
        type: "number",
        description: "A number",
      },
      {
        name: "test.boolean",
        type: "boolean",
        description: "A boolean",
      },
    ],
  },

  Mutation: {
    pipeline: (_, { id, conf }, { dataSources }) => dataSources.db.createPipeline(id, conf),
    entry: (_, { id, conf }, { dataSources }) => dataSources.db.createEntry(id, conf),
  },

  Entry: {
    pipeline: (e) => e.getPipeline(),
    filter: (e) => ({
      start: e.filter_start,
      end: e.filter_end,
      includes: e.filter_includes,
      excludes: e.filter_excludes,
    }),
  },
};
