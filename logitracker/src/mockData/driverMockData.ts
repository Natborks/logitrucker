import type Driver from "../types/Driver";

export const driverData: Driver[] = [
  {
    id: "1",
    name: "John Smith",
    status: "delivering",
    eta: "2025-05-13T10:30:00Z",
    location: { lat: 47.5612, lng: -52.7123 },
    numDelivering: 1,
  },
  {
    id: "2",
    name: "Emma Johnson",
    status: "idle",
    eta: "2025-05-13T10:15:00Z",
    location: { lat: 47.5768, lng: -52.7065 },
    numDelivering: 1,
  },
  {
    id: "3",
    name: "Michael Brown",
    status: "delivering",
    eta: "2025-05-13T10:45:00Z",
    location: { lat: 47.5891, lng: -52.725 },
    numDelivering: 1,
  },
  {
    id: "4",
    name: "Sarah Davis",
    status: "delivering",
    eta: "2025-05-13T08:30:00Z",
    location: { lat: 47.5433, lng: -52.6761 },
    numDelivering: 1,
  },
  {
    id: "5",
    name: "Robert Wilson",
    status: "paused",
    eta: "2025-05-13T10:25:00Z",
    location: { lat: 47.5677, lng: -52.6934 },
    numDelivering: 1,
  },
];
