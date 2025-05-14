import React from "react";
import styles from "./Router.module.css";

type RouterProps = {
  children: React.ReactNode;
};

const Router: React.FC<RouterProps> = ({ children }) => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
};

export default Router;
