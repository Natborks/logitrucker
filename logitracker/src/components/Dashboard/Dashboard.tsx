import React from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Router from "../Router/Router";
import DriverDashboard from "../Drivers/Drivers";
import MapDashboard from "../MapDashboard/MapDashboard";
import DriverInfoProvider from "../../Providers/Driver/DriverInfoProvider";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Router>
        <DriverInfoProvider>
          <MapDashboard />
          <DriverDashboard />
        </DriverInfoProvider>
      </Router>
    </div>
  );
};

export default Dashboard;
