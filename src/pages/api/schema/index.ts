import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Character {
    name: String!
    gameSeries: String!
    image: String!
  }

  type Query {
    characters(series: String!): [Character!]!
  }
`;
