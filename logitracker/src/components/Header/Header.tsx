import styles from "./header.module.css";

// Header.tsx
type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
  </div>
);
