import React, { useContext } from "react";
import LiveMap from "../LiveMap/Livemap";
import { MapSidePanel } from "../MapSidePanel/MapSidePanel";
import styles from "./mapdashboard.module.css";
import useSocketData from "../../sockets/useSockets";

const MapDashboard: React.FC = () => {
  useSocketData();

  return (
    <section className={styles.wrapper}>
      <LiveMap />
      <MapSidePanel />
    </section>
  );
};

export default MapDashboard;
