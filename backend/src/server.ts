// server.js
import { WebSocketServer } from "ws";

const PORT = 3000;
const wss = new WebSocketServer({ port: 3000 });

console.log(`✅ WebSocket server running at ws://localhost:${PORT}`);

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  setInterval(() => {
    ws.send("something");
  }, 2000);

  ws.send("something again");
});
