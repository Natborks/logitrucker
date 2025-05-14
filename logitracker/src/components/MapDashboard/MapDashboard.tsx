import React, { useContext } from "react";
import LiveMap from "../LiveMap/Livemap";
import { MapSidePanel } from "../MapSidePanel/MapSidePanel";
import styles from "./mapdashboard.module.css";
import { DriverInfoContext } from "../../Providers/Driver/DriverInfoProvider";

const MapDashboard: React.FC = () => {
  const { handleDriverSelection, selectedDriver } =
    useContext(DriverInfoContext);

  return (
    <section className={styles.wrapper}>
      <LiveMap
        selectedDriver={selectedDriver}
        handleDriverSelection={handleDriverSelection}
      />
      <MapSidePanel selectedDriver={selectedDriver} />
    </section>
  );
};

export default MapDashboard;
