/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CharactersQuery
// ====================================================

export interface CharactersQuery_characters {
  __typename: "Character";
  name: string;
  image: string;
}

export interface CharactersQuery {
  characters: CharactersQuery_characters[];
}

export interface CharactersQueryVariables {
  series: string;
}
