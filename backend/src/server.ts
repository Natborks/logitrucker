// server.js
import { WebSocketServer } from "ws";
import { driverData as drivers } from "./driverMockData.js";

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

function updateRandomDriver() {
  const i = Math.floor(Math.random() * driverStates.length);
  const driver = driverStates[i];

  if (Math.random() < 0.1) {
    driver.direction = getRandomDirection();
  }

  driver.location.lat += STEP * driver.direction.lat;
  driver.location.lng += STEP * driver.direction.lng;

  return driver;
}

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", (data) => console.log("received:", data.toString()));

  const interval = setInterval(() => {
    const updatedDriver = updateRandomDriver();
    ws.send(JSON.stringify(updatedDriver));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});
