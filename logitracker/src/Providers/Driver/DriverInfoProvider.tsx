import { createContext, useReducer, useState } from "react";
import type Driver from "../../types/Driver";
import useSocketData from "../../sockets/useSockets";
type DriverInfoContextType = {
  handleDriverSelection: (driver: Driver) => void;
  selectedDriver: Driver | undefined;
};

type DriverInfoDispatchContextType = {
  handleDriverPositionUpdate: (drivers: Driver[]) => void;
  pauseDriver: (driverId: string) => void;
  resumeDriver: (driverId: string) => void;
  completeTrip: (driverId: string) => void;
  reassign: (driverId: string, assingee: string) => void;
  driverInfo: Driver[];
  filter: (filter: string) => void;
};

type DriverInfoProviderProps = {
  children: React.ReactNode;
};

export const DriverInfoContext = createContext<DriverInfoContextType>({
  handleDriverSelection: () => {},
  selectedDriver: undefined,
});

export const DriverInfoDispatchContext =
  createContext<DriverInfoDispatchContextType>({
    handleDriverPositionUpdate: () => {},
    driverInfo: [],
    pauseDriver: (driverId: string) => {},
    resumeDriver: (driverId: string) => {},
    completeTrip: (driverId: string) => {},
    reassign: (driverId: string, assignee: string) => {},
    filter: (filter: string) => {},
  });

function DriverInfoProvider({ children }: DriverInfoProviderProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(
    undefined
  );
  const { driverData } = useSocketData();
  const [driverInfo, dispatch] = useReducer(
    driverLocationReducer,
    driverData ?? []
  );

  //pricinple of least privilege
  function handleDriverSelection(driver: Driver) {
    setSelectedDriver(driver);
  }

  function handleDriverPositionUpdate(drivers: Driver[]) {
    dispatch({ drivers, type: "DRIVERS_UPDATED" });
  }

  function pauseDriver(driverId: string) {
    dispatch({ type: "PAUSE_DRIVER", driverId });
  }

  function resumeDriver(driverId: string) {
    dispatch({ type: "RESUME_DRIVER", driverId });
  }

  function completeTrip(driverId: string) {
    dispatch({ type: "COMPLETE_TRIP", driverId });
  }

  function reassign(driverId: string, assignee: string) {
    const driver = driverData?.find((driver) => driver.id == driverId);
    const count = driver ? driver.numDelivering : 0;
    dispatch({
      type: "REASSIGN",
      driverId,
      assignee,
      count,
    });
  }

  function filter(filterType: string) {
    dispatch({ type: "FILTER", filter: filterType });
  }

  return (
    <DriverInfoContext.Provider
      value={{ handleDriverSelection, selectedDriver }}
    >
      <DriverInfoDispatchContext.Provider
        value={{
          driverInfo,
          handleDriverPositionUpdate,
          pauseDriver,
          resumeDriver,
          completeTrip,
          reassign,
          filter,
        }}
      >
        {children}
      </DriverInfoDispatchContext.Provider>
    </DriverInfoContext.Provider>
  );
}

//consider using enum for type
type Action =
  | { type: "DRIVERS_UPDATED"; drivers: Driver[] }
  | { type: "PAUSE_DRIVER"; driverId: string }
  | { type: "RESUME_DRIVER"; driverId: string }
  | { type: "COMPLETE_TRIP"; driverId: string }
  | { type: "REASSIGN"; driverId: string; assignee: string; count: number | 0 }
  | { type: "FILTER"; filter: string };

type ReducerType = (drivers: Driver[], action: Action) => Driver[];

const driverLocationReducer: ReducerType = (drivers, action) => {
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
          return { ...driver, numDelivering: driver.numDelivering + 1 };
        }
        return driver;
      });
    case "FILTER":
      return drivers.filter((driver) =>
        action.filter === "all" ? true : driver.status === action.filter
      );
    default: {
      return drivers;
    }
  }
};

export default DriverInfoProvider;
