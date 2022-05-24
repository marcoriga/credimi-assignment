import Link from "next/link";
import type { NextPage } from "next";
import styles from "styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.Wrapper}>
      <Link passHref href="/mario-sports-superstars">
        <a className={styles.Box}>
          <h4>Mario Sports Superstars</h4>
        </a>
      </Link>

      <Link passHref href="/animal-crossing">
        <a className={styles.Box}>
          <h4>Animal Crossing</h4>
        </a>
      </Link>

      <Link passHref href="/pokemon">
        <a className={styles.Box}>
          <h4>Pokemon</h4>
        </a>
      </Link>
    </div>
  );
};

export default Home;
