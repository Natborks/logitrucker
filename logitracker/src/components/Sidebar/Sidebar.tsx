import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>LogiTracker</span>
        </div>
      </header>

      <nav className={styles.navigation} aria-label="Main navigation"></nav>

      <footer className={styles.footer}>&copy; 2025 FleetTrack</footer>
    </aside>
  );
};

export default Sidebar;
