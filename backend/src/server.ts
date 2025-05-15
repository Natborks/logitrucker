// server.js
import { WebSocketServer } from "ws";
import { driverData as drivers } from "./driverMockData.js";
import Driver from "./Driver.js";

const PORT = 3000;
const wss = new WebSocketServer({ port: PORT });

console.log(`✅ WebSocket server running at ws://localhost:${PORT}`);

const STEP = 0.0001;

const directionOptions = [
  { lat: 1, lng: 0 },
  { lat: -1, lng: 0 },
  { lat: 0, lng: 1 },
  { lat: 0, lng: -1 },
  { lat: 1, lng: 1 },
  { lat: -1, lng: -1 },
  { lat: -1, lng: 1 },
  { lat: 1, lng: -1 },
];

// Store driver state and direction
const driverStates = drivers.map((driver) => ({
  ...driver,
  direction: getRandomDirection(),
}));

function getRandomDirection() {
  return directionOptions[Math.floor(Math.random() * directionOptions.length)];
}

function updateDriver(driver: Driver) {
  const direction = getRandomDirection();

  driver.location.lat += STEP * direction.lat;
  driver.location.lng += STEP * direction.lng;

  return driver;
}

wss.on("open", function open(ws) {
  ws.send("something");
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", (data) => console.log("received:", data.toString()));

  const interval = setInterval(() => {
    const updatedDrivers = drivers.map((driver) => updateDriver(driver));
    ws.send(JSON.stringify(updatedDrivers));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});
