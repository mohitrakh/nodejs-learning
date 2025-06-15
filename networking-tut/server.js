const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (buff) => {
    console.log(buff.toString());
  });
});
// this socket in callback is connnection means
// the socket represent the device that is connected

server.listen(8000, "127.0.0.1", () => {
  console.log("opened server on ", server.address());
});
