import React, { useContext } from "react";
import { driverData as drivers } from "../../mockData/driverMockData";
import styles from "./drivers.module.css";
import { formatTime } from "../../utils/DataTimeUtile";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { DriverInfoContext } from "../../Providers/Driver/DriverInfoProvider";

const DriverDashboard: React.FC = () => {
  const { handleDriverSelection } = useContext(DriverInfoContext);

  return (
    <div className={styles.container}>
      <div className={styles.driverList}>
        <div className={styles.driverListHeader}>
          <h2 className={styles.driverListTitle}>Drivers</h2>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Current Location</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} onClick={() => handleDriverSelection(driver)}>
                <td>{driver.name}</td>
                <td>
                  <StatusBadge
                    status={driver.status}
                    key={
                      driver.status.charAt(0).toUpperCase() +
                      driver.status.slice(1)
                    }
                  />
                </td>
                <td>{formatTime(driver.eta)}</td>
                <td>
                  {driver.location.lat},{driver.location.lng}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverDashboard;
