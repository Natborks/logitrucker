import styles from "./card.module.css";

type CardProps = {
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className={styles.statCard}>{children}</div>
);
