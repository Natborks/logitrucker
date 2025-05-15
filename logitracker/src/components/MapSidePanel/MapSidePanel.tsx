import styles from "./mapSidePanel.module.css";
import { Card } from "../Card/Card";
import { DriverInfoContext } from "../../providers/Driver/DriverInfoProvider";
import { useContext } from "react";

export const MapSidePanel: React.FC = () => {
  const { selectedDriver } = useContext(DriverInfoContext);
  return (
    <>
      {selectedDriver ? (
        <Card>
          <div className={styles.wrapper}>
            <div
              className={styles.statTitle}
            >{`Truck ID: ${selectedDriver?.id}`}</div>
            <p>Current Location</p>
            <div
              className={styles.statTitle}
            >{`latitude: ${selectedDriver?.location.lat}`}</div>
            <div
              className={styles.statTitle}
            >{`longitude: ${selectedDriver?.location.lng}`}</div>
          </div>
        </Card>
      ) : (
        <Card>
          <p>No driver selected</p>
        </Card>
      )}
    </>
  );
};
