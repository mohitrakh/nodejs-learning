import net from "node:net";

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log("message from the client: ", data.toString());
  });
  socket.write("I am good, how are you client");
});

server.listen(8000, () => {
  console.log("server is connected");
});
