import { createContext, useState } from "react";
import type Driver from "../../types/Driver";

type DriverInfoContextType = {
  handleDriverSelection: (driver: Driver) => void;
  selectedDriver: Driver | undefined;
};

type DriverInfoProviderProps = {
  children: React.ReactNode;
};

export const DriverInfoContext = createContext<DriverInfoContextType>({
  handleDriverSelection: () => {},
  selectedDriver: undefined,
});

function DriverInfoProvider({ children }: DriverInfoProviderProps) {
  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(
    undefined
  );

  //pricinple of least privilege
  function handleDriverSelection(driver: Driver) {
    setSelectedDriver(driver);
  }

  return (
    <DriverInfoContext.Provider
      value={{ handleDriverSelection, selectedDriver }}
    >
      {children}
    </DriverInfoContext.Provider>
  );
}

export default DriverInfoProvider;
