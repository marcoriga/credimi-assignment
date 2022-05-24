import {
  CharactersQuery,
  CharactersQueryVariables,
  CharactersQuery_characters,
} from "src/graphql/types/CharactersQuery";

import { CHARACTERS } from "src/graphql/queries/characters";
import Card from "src/components/card";
import Head from "next/head";
import Loader from "src/components/loader";
import type { NextPage } from "next";
import styles from "styles/Home.module.scss";
import { useQuery } from "@apollo/client";
import { useState } from "react";

let timeout: any;

const Home: NextPage = () => {
  const [active, setActive] = useState<number[]>([]);
  const [guessed, setGuessed] = useState<number[]>([]);

  const [characters, setCharacters] = useState<
    CharactersQuery_characters[] | []
  >([]);

  const { loading } = useQuery<CharactersQuery, CharactersQueryVariables>(
    CHARACTERS,
    {
      variables: { series: "pokemon" },
      onCompleted: (data: CharactersQuery) => {
        setCharacters(
          [...data.characters, ...data.characters].sort(
            () => Math.random() - 0.5
          )
        );
      },
    }
  );

  const compareSelection = (index: number) => {
    return characters[index].name === characters[active[0]].name;
  };

  const onCardClick = (index: number) => {
    if (active.includes(index) || guessed.includes(index)) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    if (active.length === 1) {
      if (compareSelection(index)) {
        setGuessed([...guessed, ...active, index]);
        setActive([]);
      } else {
        setActive([...active, index]);

        timeout = setTimeout(() => {
          setActive([]);
        }, 800);
      }
    } else {
      setActive([index]);
    }
  };

  return (
    <>
      <Head>
        <title>Frontend assignment | Credimi</title>
        <meta name="description" content="Author Marco Rigamonti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.Container}>
        <h1 className={styles.Title}>Credimi assignment</h1>

        {loading && <Loader />}

        {characters && (
          <>
            <div className={styles.Grid}>
              {characters.map((character, index) => (
                <Card
                  key={index}
                  character={character}
                  active={active.includes(index)}
                  guessed={guessed.includes(index)}
                  onClick={() => onCardClick(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
