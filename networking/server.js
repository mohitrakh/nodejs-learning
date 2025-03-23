import net from "node:net";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // "data" is buffer
    console.log(data.toString());
  });
});

server.listen(3099, "127.0.0.1", () => {
  console.log(server.address());
});
