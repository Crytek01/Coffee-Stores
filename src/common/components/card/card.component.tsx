import { FunctionComponent } from "react";
import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";

import styles from "./card.module.css";

interface ICardProps {
  route: string;
  name: string;
  imageSrc: string;
  imageAltText: string;
  className: string;
}

const containerClassnames = classnames(styles.container, "glass");

export const Card: FunctionComponent<ICardProps> = ({
  route,
  name,
  imageSrc,
  imageAltText,
}) => {
  return (
    <Link href={route} className={styles.cardLink}>
      <div className={containerClassnames}>
        <h2 className={styles.cardHeader}>{name}</h2>

        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imageSrc}
            width={260}
            height={160}
            alt={imageAltText}
          />
        </div>
      </div>
    </Link>
  );
};
