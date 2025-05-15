// server.js
import { WebSocketServer } from "ws";
import { driverData } from "./driverMockData.js";
import Driver from "./Driver.js";

const PORT = 3000;
const wss = new WebSocketServer({ port: PORT });

console.log(` WebSocket server running at ws://localhost:${PORT}`);

const STEP = 0.0001;

function updateDriver(driver: Driver) {
  if (driver.status == "delivering") {
    driver.location.lat += STEP * 1;
    driver.location.lng += STEP * -1;
  }

  return driver;
}

var drivers = driverData;

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    let response;

    switch (message.type) {
      case "PAUSE": {
        const driver = drivers.find((d) => d.id === message.data);
        if (driver) {
          driver.status = "paused";
        }
        break;
      }

      case "RESUME": {
        const driver = drivers.find((d) => d.id === message.data);
        if (driver) {
          driver.status = "delivering";
        }
        break;
      }

      case "FILTER": {
        drivers = driverData.filter((d) =>
          message.data == "all" ? true : d.status == message.data
        );

        break;
      }

      case "COMPLETE": {
        const driver = drivers.find((d) => d.id === message.data);
        if (driver) {
          driver.status = "completed";
          driver.numDelivering = 0;
        }
        break;
      }

      case "REASSIGN": {
        const driver = drivers.find((d) => d.id === message.driverId);
        const assignee = drivers.find((d) => d.id === message.assignee);

        if (driver && assignee) {
          driver.numDelivering = 0;
          driver.status = "idle";
          assignee.numDelivering += message.count;
        }
        break;
      }

      default:
        {
          console.log("setting error response");
          response = {
            error: true,
          };
          ws.send(JSON.stringify(response));
        }
        break;
    }
  });

  const interval = setInterval(() => {
    const updatedDrivers = drivers.map((driver) => updateDriver(driver));
    ws.send(JSON.stringify(updatedDrivers));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});
