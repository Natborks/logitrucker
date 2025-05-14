import React, { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./livemap.module.css";
import type Driver from "../../types/Driver";
import { Icon } from "leaflet";
import { DriverInfoDispatchContext } from "../../providers/Driver/DriverInfoProvider";

type LiveMapProps = {
  handleDriverSelection: (driver: Driver) => void;
  selectedDriver?: Driver;
};

const LiveMap: React.FC<LiveMapProps> = ({
  selectedDriver,
  handleDriverSelection,
}) => {
  const { driverInfo } = useContext(DriverInfoDispatchContext);

  return (
    <MapContainer
      center={[47.5615, -52.7126]}
      zoom={13}
      scrollWheelZoom={false}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[47.5615, -52.7126]}>
        {driverInfo.map((driver) => (
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
