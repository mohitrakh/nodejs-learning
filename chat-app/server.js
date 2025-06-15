import net from "node:net";

const server = net.createServer();
let clients = [];
server.on("connection", (socket) => {
  console.log("Connected user");

  const clientId = clients.length + 1;
  // Broadcasting message when user joins
  clients.map((s) => {
    if (s.socket !== socket) {
      s.socket.write(`User ${clientId} Joined the chat room`); // send to other clients
    }
  });
  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    clients.map((s) => {
      if (s.socket !== socket) {
        s.socket.write(data); // send to other clients
      }
    });
    socket.write(data); // send message to the client
  });

  clients.push({ id: clientId, socket });
  socket.on("close", () => {
    // Remove the client from the list
    clients = clients.filter((s) => s.socket !== socket);

    // Broadcast to other users
    clients.map((s) => {
      s.socket.write(`User ${clientId} left the chat room`);
    });
  });
  socket.on("error", (err) => {
    console.log("Socket error:", err.message);
    clients = clients.filter((s) => s !== socket);
  });
});

server.listen(8000, () => {
  console.log("Server listening on the port 8000", server.address());
});
