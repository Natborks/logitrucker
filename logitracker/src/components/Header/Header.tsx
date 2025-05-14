import styles from "./header.module.css";

// Header.tsx
type HeaderProps = {
  children: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ children }) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{children}</h1>
  </div>
);
