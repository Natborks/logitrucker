import { createContext, useReducer, useState } from "react";
import type Driver from "../../types/Driver";
import { driverData as drivers } from "../../mockData/driverMockData";
import useSocketData from "../../sockets/useSockets";
type DriverInfoContextType = {
  handleDriverSelection: (driver: Driver) => void;
  selectedDriver: Driver | undefined;
};

type DriverInfoDispatchContextType = {
  handleDriverPositionUpdate: (drivers: Driver[]) => void;
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
  const { driverData } = useSocketData();
  const [driverInfo, dispatch] = useReducer(
    driverLocationReducer,
    driverData ?? drivers
  );

  //pricinple of least privilege
  function handleDriverSelection(driver: Driver) {
    setSelectedDriver(driver);
  }

  function handleDriverPositionUpdate(drivers: Driver[]) {
    dispatch({ drivers, type: "DRIVERS_UPDATED" });
  }

  return (
    <DriverInfoContext.Provider
      value={{ handleDriverSelection, selectedDriver }}
    >
      <DriverInfoDispatchContext.Provider
        value={{
          driverInfo,
          handleDriverPositionUpdate,
        }}
      >
        {children}
      </DriverInfoDispatchContext.Provider>
    </DriverInfoContext.Provider>
  );
}

type Action = {
  type: string;
  drivers: Driver[];
};

type ReducerType = (drivers: Driver[], action: Action) => Driver[];

const driverLocationReducer: ReducerType = (drivers, action) => {
  switch (action.type) {
    case "DRIVERS_UPDATED": {
      return action.drivers;
    }
    default: {
      return drivers;
    }
  }
};

export default DriverInfoProvider;
