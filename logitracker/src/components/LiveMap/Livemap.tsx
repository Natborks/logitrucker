import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./livemap.module.css";
import { Icon } from "leaflet";
import {
  DriverInfoContext,
  DriverInfoDispatchContext,
} from "../../providers/Driver/DriverInfoProvider";

const LiveMap: React.FC = () => {
  const { handleDriverSelection, selectedDriver } =
    useContext(DriverInfoContext);
  const { driverInfo: drivers } = useContext(DriverInfoDispatchContext);

  return (
    <section className={styles.mapWrapper}>
      <MapContainer
        center={[47.5615, -52.7126]}
        zoom={11}
        scrollWheelZoom={false}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[47.5615, -52.7126]}>
          {drivers.map((driver) => (
            <Marker
              key={driver.id}
              position={[
                Number(driver.location.lat.toFixed(4)),
                Number(driver.location.lng.toFixed(4)),
              ]}
              icon={
                driver.id == selectedDriver?.id
                  ? selectedVehicleIcon
                  : vehicleIcon
              }
              eventHandlers={{
                click: () => {
                  handleDriverSelection(driver);
                },
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">{driver.name}</h3>{" "}
                  <p>Status: {driver.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </Marker>
      </MapContainer>
    </section>
  );
};

//consider extracting to new component
const vehicleIcon = new Icon({
  iconUrl: "https://img.icons8.com/color/48/semi-truck-side-view.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const selectedVehicleIcon = new Icon({
  iconUrl: "https://img.icons8.com/color/48/semi-truck-side-view.png",
  iconSize: [58, 58],
  iconAnchor: [19, 38],
});

export default LiveMap;
