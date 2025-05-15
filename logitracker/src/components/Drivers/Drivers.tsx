import React, { useContext, useState } from "react";
import styles from "./drivers.module.css";
import { formatTime } from "../../utils/DataTimeUtile";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import {
  DriverInfoContext,
  DriverInfoDispatchContext,
} from "../../providers/Driver/DriverInfoProvider";
import { getSocket } from "../../sockets/Socket";

const DriverDashboard: React.FC = () => {
  const { handleDriverSelection } = useContext(DriverInfoContext);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const {
    driverInfo: drivers,
    pauseDriver,
    resumeDriver,
    completeTrip,
    reassign: reassingPackage,
    filter,
  } = useContext(DriverInfoDispatchContext);

  const socket = getSocket();

  function handlePauseClick(driverId: string, status: string) {
    if (status == "delivering") {
      console.log("updating state optmisitically");
      pauseDriver(driverId);

      sendUpdateViaSocket("PAUSE", driverId);
    } else {
      resumeDriver(driverId);

      sendUpdateViaSocket("RESUME", driverId);
    }
  }

  function handleFilterStatus(filterStatus: string) {
    //optmisic filtering
    filter(filterStatus);
    setFilterStatus(filterStatus);
    sendUpdateViaSocket("FILTER", filterStatus);
  }

  function handleCompleteTrip(driverId: string) {
    completeTrip(driverId);
    sendUpdateViaSocket("COMPLETE", driverId);
  }

  //consider using modal
  function handleReassign(driverId: string) {
    const assignee: string | null =
      prompt("enter id of driver to reassign to") || null;

    if (assignee) {
      if (parseInt(assignee) < 0 || parseInt(assignee) > 5) {
        alert("No such Driver");
        return;
      }

      reassingPackage(driverId, assignee);
    }

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "REASSIGN", driverId, assignee }));
    }
  }

  function sendUpdateViaSocket(type: string, data: String) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type, data }));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.driverList}>
        <div className={styles.driverListHeader}>
          <h2 className={styles.driverListTitle}>Drivers</h2>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => handleFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="delivering">Delivering</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Current Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} onClick={() => handleDriverSelection(driver)}>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <td>
                  <StatusBadge
                    status={driver.status}
                    key={`${driver.id}-${driver.status}`}
                  />
                  {`(${driver?.numDelivering})`}
                </td>
                <td>{formatTime(driver.eta)}</td>
                <td>
                  {driver.location.lat.toFixed(4)},{" "}
                  {driver.location.lng.toFixed(4)}
                </td>
                <td>
                  {/* consider cleaning up */}
                  <button
                    disabled={driver.status == "completed"}
                    onClick={() => {
                      handlePauseClick(driver.id, driver.status);
                    }}
                  >
                    {driver.status == "paused" || "idle" ? "resume" : "pause"}
                  </button>
                  {driver.status == "delivering" && (
                    <button
                      onClick={() => {
                        handleCompleteTrip(driver.id);
                      }}
                    >
                      complete
                    </button>
                  )}
                  {driver.status == "delivering" && (
                    <button
                      onClick={() => {
                        handleReassign(driver.id);
                      }}
                    >
                      reassign
                    </button>
                  )}
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
