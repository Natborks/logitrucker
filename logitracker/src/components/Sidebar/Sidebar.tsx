import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <a href="/">Logo Here</a>
      <nav>
        <ol>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Other Stuff</a>
          </li>
        </ol>
      </nav>

      <footer className={styles.footer}>&copy; 2025 FleetTrack</footer>
    </aside>
  );
};

export default Sidebar;
