import {
  CharactersQuery,
  CharactersQueryVariables,
} from "src/graphql/types/CharactersQuery";

import { CHARACTERS } from "src/graphql/queries/characters";
import Head from "next/head";
import type { NextPage } from "next";
import styles from "../../styles/Home.module.scss";
import { useQuery } from "@apollo/client";

const Home: NextPage = () => {
  const { loading, data } = useQuery<CharactersQuery, CharactersQueryVariables>(
    CHARACTERS,
    {
      variables: { series: "pokemon" },
    }
  );

  console.log(loading, data);

  return (
    <>
      <Head>
        <title>Frontend assignment | Credimi</title>
        <meta name="description" content="Author Marco Rigamonti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Home;
