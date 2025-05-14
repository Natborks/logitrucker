import type Driver from "../types/Driver";

export const driverData: Driver[] = [
  {
    id: "1",
    name: "John Smith",
    vehicleId: "v001",
    vehicleName: "Delivery Van #1",
    status: "delivering",
    lastActive: "2025-05-13T10:30:00Z",
    location: { lat: 47.5612, lng: -52.7123 },
  },
  {
    id: "2",
    name: "Emma Johnson",
    vehicleId: "v002",
    vehicleName: "Delivery Van #2",
    status: "idle",
    lastActive: "2025-05-13T10:15:00Z",
    location: { lat: 47.5768, lng: -52.7065 },
  },
  {
    id: "3",
    name: "Michael Brown",
    vehicleId: "v003",
    vehicleName: "Truck #101",
    status: "delivering",
    lastActive: "2025-05-13T10:45:00Z",
    location: { lat: 47.5891, lng: -52.725 },
  },
  {
    id: "4",
    name: "Sarah Davis",
    vehicleId: "v004",
    vehicleName: "Truck #102",
    status: "delivering",
    lastActive: "2025-05-13T08:30:00Z",
    location: { lat: 47.5433, lng: -52.6761 },
  },
  {
    id: "5",
    name: "Robert Wilson",
    vehicleId: "v005",
    vehicleName: "Delivery Van #3",
    status: "paused",
    lastActive: "2025-05-13T10:25:00Z",
    location: { lat: 47.5677, lng: -52.6934 },
  },
];
