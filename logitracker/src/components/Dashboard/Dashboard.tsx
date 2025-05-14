import React from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DriverDashboard from "../Drivers/Drivers";
import MapDashboard from "../MapDashboard/MapDashboard";
import DriverInfoProvider from "../../providers/Driver/DriverInfoProvider";
import { Header } from "../Header/Header";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <main className={styles.main}>
        <Header>Dashboard</Header>

        <DriverInfoProvider>
          <MapDashboard />
          <DriverDashboard />
        </DriverInfoProvider>
      </main>
    </div>
  );
};

export default Dashboard;
