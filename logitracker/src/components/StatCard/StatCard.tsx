import styles from "./statcard.module.css";
import { Card } from "../Card/Card";

type StatCardProps = {
  title: string;
  value: number;
};

export const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <Card>
    <div className={styles.statTitle}>{title}</div>
    <div className={styles.statValue}>{value}</div>
  </Card>
);
