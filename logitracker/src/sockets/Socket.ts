let socket: WebSocket;

export function getSocket() {
  if (!socket) {
    socket = new WebSocket("ws://localhost:3000");
  }
  return socket;
}
