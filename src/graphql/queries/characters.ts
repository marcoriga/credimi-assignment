import { gql } from "@apollo/client";

export const CHARACTERS = gql`
  query CharactersQuery($series: String!) {
    characters(series: $series) {
      name
      image
    }
  }
`;
