import React, { FC } from "react";

import { CharactersQuery_characters } from "src/graphql/types/CharactersQuery";
import Image from "next/image";
import styles from "./Card.module.scss";
import variables from "styles/variables.module.scss";

interface CardProps {
  character: CharactersQuery_characters;
  onClick: () => void;
  active: boolean;
  guessed: boolean;
}

const Card: FC<CardProps> = ({ character, onClick, active, guessed }) => {
  const classes = [styles.Card];

  if (active) {
    classes.push(styles.Active);
  } else if (guessed) {
    classes.push(styles.Guessed);
  } else {
    classes.push(styles.Clickable);
  }

  return (
    <div
      className={classes.join(" ")}
      onClick={!active && !guessed ? onClick : undefined}
    >
      <div className={styles.Inner}>
        <div className={styles.Front}>
          <svg
            width="48"
            height="22"
            viewBox="0 0 48 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={variables.primaryColor}
              d="M33 0h-5.23a7 7 0 0 0-6.55 4.54l-4.06 10.81a1 1 0 0 1-.93.65H11a5 5 0 0 1 0-10h4a3 3 0 0 0 0-6h-4a11 11 0 0 0 0 22h5.23a7 7 0 0 0 6.55-4.54l4.06-10.81a1 1 0 0 1 .93-.65H33a5 5 0 0 1 0 10h-4a3 3 0 0 0 0 6h4a11 11 0 0 0 0-22z"
            ></path>
          </svg>
        </div>

        <div className={styles.Back}>
          <Image
            width={90}
            height={100}
            alt={character.name}
            src={character.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
