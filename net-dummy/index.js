import http from "http";

let port = 80;

const server = http.createServer((req, res) => {
  const data = { message: "Hello mom!" };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Connection", "close");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
});

server.listen(port, "127.0.0.1", () => {
  console.log("Server is listerning on: ", port);
});
