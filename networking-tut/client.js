import net from "node:net";

const server = net.createConnection({ host: "127.0.0.1", port: 8000 }, () => {
  server.write("Hello this data coming from the client side");
});
