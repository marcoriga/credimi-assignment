import React, { FC, useEffect, useState } from "react";

import Link from "next/link";
import { createPortal } from "react-dom";
import styles from "./ModalWinner.module.scss";

interface ModalWinnerProps {
  onPlayAgain: () => void;
}

const ModalWinner: FC<ModalWinnerProps> = ({ onPlayAgain }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return createPortal(
    <div className={`${styles.Modal} ${visible ? styles.Visible : ""}`}>
      <span className={styles.Backdrop}></span>

      <div className={styles.Content}>
        <h2>Hai vinto!</h2>

        <div className={styles.Actions}>
          <button className="button button--primary" onClick={onPlayAgain}>
            Gioca ancora
          </button>

          <Link passHref href="/">
            <button className="button button--secondary">
              Torna alla home
            </button>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalWinner;
