import type Driver from "../types/Driver";

export type Action =
  | { type: "DRIVERS_UPDATED"; drivers: Driver[] }
  | { type: "PAUSE_DRIVER"; driverId: string }
  | { type: "RESUME_DRIVER"; driverId: string }
  | { type: "COMPLETE_TRIP"; driverId: string }
  | { type: "REASSIGN"; driverId: string; assignee: string; count: number }
  | { type: "FILTER"; filter: string };

export type ReducerType = (drivers: Driver[], action: Action) => Driver[];

export const driverLocationReducer: ReducerType = (drivers, action) => {
  switch (action.type) {
    case "DRIVERS_UPDATED":
      return action.drivers;

    case "PAUSE_DRIVER":
      return drivers.map((driver) =>
        driver.id === action.driverId ? { ...driver, status: "paused" } : driver
      );

    case "RESUME_DRIVER":
      return drivers.map((driver) =>
        driver.id === action.driverId
          ? { ...driver, status: "delivering" }
          : driver
      );

    case "COMPLETE_TRIP":
      return drivers.map((driver) =>
        driver.id === action.driverId
          ? { ...driver, status: "completed", numDelivering: 0 }
          : driver
      );

    case "REASSIGN":
      return drivers.map((driver) => {
        if (driver.id === action.driverId) {
          return { ...driver, numDelivering: 0, status: "idle" };
        } else if (driver.id === action.assignee) {
          return {
            ...driver,
            numDelivering: driver.numDelivering + action.count,
          };
        }
        return driver;
      });

    case "FILTER":
      return drivers.filter((driver) =>
        action.filter === "all" ? true : driver.status === action.filter
      );

    default:
      return drivers;
  }
};
