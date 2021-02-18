import { gql } from 'apollo-server';

export default gql`
scalar JSON
scalar JSONObject

type Query {
  pipelines: [Pipeline!]
  pipeline(id: Int!): Pipeline
  entries: [Entry!]
  entry(id: Int!): Entry
}

type Pipeline {
  name: String!
  provider: String!
  config: JSON
}

type Entry {
  name: String!
  pipeline: Pipeline!
  directory: String!
  filter: Filter
  config: JSON
}

type Filter {
  start: Int
  end: Int
  includes: [String!]
  excludes: [String!]
}
`;
