import React, { useContext } from "react";
import LiveMap from "../LiveMap/Livemap";
import { MapSidePanel } from "../MapSidePanel/MapSidePanel";
import styles from "./mapdashboard.module.css";
import { DriverInfoContext } from "../../providers/Driver/DriverInfoProvider";
import useSocketData from "../../sockets/useSockets";

const MapDashboard: React.FC = () => {
  const { handleDriverSelection, selectedDriver } =
    useContext(DriverInfoContext);

  const { data } = useSocketData();

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
