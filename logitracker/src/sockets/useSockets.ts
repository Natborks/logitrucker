import React, { useEffect, useState } from "react";
import type Driver from "../types/Driver";

type stateData = {
  drivers: Driver[] | null;
};
function useSocketData() {
  const [data, setData] = useState<stateData>();

  useEffect(() => {
    let socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("websocket opened");
    };

    socket.onmessage = (e) => {
      //dispatch here
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
