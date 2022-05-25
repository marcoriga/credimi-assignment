import {
  CharactersQuery,
  CharactersQueryVariables,
  CharactersQuery_characters,
} from "src/graphql/types/CharactersQuery";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { CHARACTERS } from "src/graphql/queries/characters";
import Card from "src/components/card";
import Loader from "src/components/loader";
import ModalWinner from "src/components/modal-winner";
import React from "react";
import styles from "styles/Game.module.scss";
import { useQuery } from "@apollo/client";
import { useState } from "react";

let timeout: ReturnType<typeof setTimeout>;

interface GameProps {
  series: "Pokemon" | "Animal Crossing" | "Mario Sports Superstars";
}

const Game: NextPage<GameProps> = ({ series }) => {
  const [active, setActive] = useState<number[]>([]);
  const [guessed, setGuessed] = useState<number[]>([]);

  const [characters, setCharacters] = useState<
    CharactersQuery_characters[] | []
  >([]);

  const { loading, refetch } = useQuery<
    CharactersQuery,
    CharactersQueryVariables
  >(CHARACTERS, {
    variables: { series },
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: CharactersQuery) => {
      setCharacters(
        [...data.characters, ...data.characters].sort(() => Math.random() - 0.5)
      );
    },
  });

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

  const restart = () => {
    setActive([]);
    setGuessed([]);
    setCharacters([]);

    refetch();
  };

  if (loading) {
    return <Loader />;
  }

  return (
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

      {guessed.length === characters.length && (
        <ModalWinner onPlayAgain={restart} />
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { game: "mario-sports-superstars" } },
      { params: { game: "animal-crossing" } },
      { params: { game: "pokemon" } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      series: (params!.game as string)
        .replaceAll("-", " ")
        .replaceAll(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
    },
  };
};

export default Game;
