import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { driverData as drivers } from "../../mockData/driverMockData";
import styles from "./livemap.module.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import type Driver from "../../types/Driver";
import { Icon } from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

type LiveMapProps = {
  handleDriverSelection: (driver: Driver) => void;
  selectedDriver?: Driver;
};

const LiveMap: React.FC<LiveMapProps> = ({
  selectedDriver,
  handleDriverSelection,
}) => {
  //consider extracting to new component
  const vehicleIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/color/48/semi-truck-side-view.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

  const selectedVehicleIcon = new Icon({
    iconUrl: "https://img.icons8.com/color/48/semi-truck-side-view.png",
    iconSize: [58, 58],
    iconAnchor: [19, 38],
  });

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
        {drivers.map((driver) => (
          <Marker
            key={driver.id}
            position={[driver.location.lat, driver.location.lng]}
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

export default LiveMap;
