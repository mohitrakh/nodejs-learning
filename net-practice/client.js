import net from "node:net";

const client = net.createConnection({ port: 8000 }, () => {
  client.write("Hello I am client, how are you server");
});

client.on("data", (data) => {
  console.log("message from the server: ", data.toString());
});
