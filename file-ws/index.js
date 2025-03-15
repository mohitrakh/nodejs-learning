const fs = require("fs/promises");

async function FileWatcher() {
  try {
    const watchFile = await fs.watch("./cmd.txt");
    for await (const event of watchFile) {
      console.log(event);
    }
  } catch (error) {
    console.log(error);
  }
}

FileWatcher();
