import { useContext, useEffect, useState } from "react";
import { DriverInfoDispatchContext } from "../providers/Driver/DriverInfoProvider";
import type Driver from "../types/Driver";

function useSocketData() {
  const { handleDriverPositionUpdate } = useContext(DriverInfoDispatchContext);
  const [driverData, setDriverData] = useState<Driver[]>();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = (e) => {
      console.log("Connection open");
    };

    socket.onmessage = (e) => {
      console.log(e);
      try {
        const data = JSON.parse(e.data);
        handleDriverPositionUpdate(data);
        setDriverData(data);
      } catch (err) {
        console.error("Failed to parse WebSocket message:", e.data);
      }
    };

    socket.onerror = (e) => {
      console.error(" WebSocket error:", e);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.warn("[close] Connection died unexpectedly");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return { driverData };
}

export default useSocketData;
