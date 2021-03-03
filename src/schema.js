import { gql } from 'apollo-server';

export default gql`
scalar JSON
scalar JSONObject

type Query {
  pipelines: [Pipeline!]
  pipeline(id: Int!): Pipeline
  entries: [Entry!]
  entry(id: Int!): Entry
  providers: [String!]
  schema(provider: String!): [SchemaEntry!]
}

type Pipeline {
  id: Int!
  name: String!
  provider: String!
  config: JSONObject
}

type Entry {
  id: Int!
  name: String!
  pipeline: Pipeline!
  directory: String!
  filter: Filter
  config: JSONObject
}

type Filter {
  start: Int
  end: Int
  includes: [String!]
  excludes: [String!]
}

type SchemaEntry {
  name: String!
  type: String!
  array: Boolean
  description: String!
  required: Boolean
  "Default value (display only)"
  default: String
}

type Mutation {
  pipeline(id: Int, conf: PipelineInput!): Boolean!
  entry(id: Int, conf: EntryInput!): Boolean!
  deletePipeline(id: Int!): Boolean!
  deleteEntry(id: Int!): Boolean!
}

input PipelineInput {
  name: String
  provider: String
  config: JSONObject
}

input EntryInput {
  name: String
  "pipeline id"
  pipeline: Int
  directory: String
  filter: FilterInput
  config: JSONObject
}

input FilterInput {
  start: Int
  end: Int
  includes: [String!]
  excludes: [String!]
}
`;