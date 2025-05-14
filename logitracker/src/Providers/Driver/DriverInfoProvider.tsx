import { createContext, useReducer, useState } from "react";
import type Driver from "../../types/Driver";
import { driverData as drivers } from "../../mockData/driverMockData";
type DriverInfoContextType = {
  handleDriverSelection: (driver: Driver) => void;
  selectedDriver: Driver | undefined;
};

type DriverInfoDispatchContextType = {
  handleDriverPositionUpdate: (driver: Driver) => void;
  driverInfo: Driver[];
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
    driverInfo: drivers,
  });

function DriverInfoProvider({ children }: DriverInfoProviderProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(
    undefined
  );
  const [driverInfo, dispatch] = useReducer(driverLocationReducer, drivers);

  //pricinple of least privilege
  function handleDriverSelection(driver: Driver) {
    setSelectedDriver(driver);
  }

  function handleDriverPositionUpdate(driver: Driver) {
    dispatch({ id: driver.id, driver, type: "DRIVER_UPDATED" });
  }

  return (
    <DriverInfoContext.Provider
      value={{ handleDriverSelection, selectedDriver }}
    >
      <DriverInfoDispatchContext.Provider
        value={{ driverInfo, handleDriverPositionUpdate }}
      >
        {children}
      </DriverInfoDispatchContext.Provider>
    </DriverInfoContext.Provider>
  );
}

type Action = {
  type: "DRIVER_UPDATED";
  id: string;
  driver: Driver;
};

type ReducerType = (drivers: Driver[], action: Action) => Driver[];

const driverLocationReducer: ReducerType = (drivers, action) => {
  switch (action.type) {
    case "DRIVER_UPDATED": {
      return drivers.map((driver) =>
        driver.id === action.driver.id
          ? {
              ...driver,
              location: {
                lat: action.driver.location.lat,
                lng: action.driver.location.lng,
              },
            }
          : driver
      );
    }
    default: {
      throw new Error("Unknown action: " + (action as any).type);
    }
  }
};

export default DriverInfoProvider;
