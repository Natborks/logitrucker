import { useContext, useEffect, useState } from "react";
import type Driver from "../types/Driver";
import { DriverInfoDispatchContext } from "../providers/Driver/DriverInfoProvider";

type stateData = {
  driver: Driver | null;
};
function useSocketData() {
  const [data, _] = useState<stateData>();
  const { handleDriverPositionUpdate } = useContext(DriverInfoDispatchContext);

  useEffect(() => {
    let socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("websocket opened");
    };

    socket.onmessage = (e) => {
      handleDriverPositionUpdate(JSON.parse(e.data));
      console.log(e);
    };

    socket.onerror = (e) => {
      console.log("error", e);
    };

    function handleSocketClose(event: CloseEvent) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.log("[close] Connection died");
      }

      alert("Error with backend connection");
    }

    return () => {
      socket.onclose = handleSocketClose;
    };
  }, []);

  return { data };
}

export default useSocketData;
