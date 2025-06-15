import net from "node:net";
import readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let id;

const clearLine = (line) => {
  return new Promise((resolve, reject) => {
    //
    process.stdout.clearLine(line, () => {
      resolve();
    });
  });
};

const moveLine = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const client = net.createConnection({ port: 8000 }, async () => {
  console.log("Connected to server");

  const ask = async () => {
    let message = await rl.question("Write your message >");
    // -1 means the curson will go up basically above and we will clear that line
    await moveLine(0, -1);
    // 0 means it will clear whole line
    await clearLine(0);

    client.write(`User ${id} ${message}`); // sending the message to the server
  };
  ask(); // asking question
  client.on("data", async (data) => {
    // getting the message from the server
    console.log();
    await moveLine(0, -1);
    // 0 means it will clear whole line
    await clearLine(0);

    if (data.toString().substring(0, 2) == "id") {
      console.log(data.toString());
      id = data.toString().substring(3);
      console.log(`Your Id is this: ${id} \n`);
    } else {
      console.log(data.toString()); // priting the received message
    }
    ask(); // asking the question again!
  });
});

// for handling the server closing off/shutting down
client.on("end", () => {
  console.log("Server closed connection gracefully.");
});

client.on("close", () => {
  console.log("Connection closed (maybe ungracefully).");
  process.exit();
});

client.on("error", (err) => {
  console.log("Error:", err.message);
});
