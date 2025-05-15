// src/providers/Driver/DriverInfoProvider.tsx

import { createContext, useReducer, useState } from "react";
import type Driver from "../../types/Driver";
import { driverLocationReducer } from "../../reducers/driverLocationReducer";

type DriverInfoContextType = {
  handleDriverSelection: (driver: Driver) => void;
  selectedDriver: Driver | undefined;
};

type DriverInfoDispatchContextType = {
  handleDriverPositionUpdate: (drivers: Driver[]) => void;
  pauseDriver: (driverId: string) => void;
  resumeDriver: (driverId: string) => void;
  completeTrip: (driverId: string) => void;
  reassign: (driverId: string, assignee: string, count: number) => void;
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
    pauseDriver: () => {},
    resumeDriver: () => {},
    completeTrip: () => {},
    reassign: () => {},
    filter: () => {},
  });

function DriverInfoProvider({ children }: DriverInfoProviderProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(
    undefined
  );

  const [driverInfo, dispatch] = useReducer(driverLocationReducer, []);

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

  function reassign(driverId: string, assignee: string, count: number) {
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

export default DriverInfoProvider;
