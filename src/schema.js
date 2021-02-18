import { gql } from 'apollo-server';

export default gql`
scalar JSON
scalar JSONObject

type Query {
  hello: JSONObject
}
`;
