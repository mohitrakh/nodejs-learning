const fs = require("fs/promises");

(async function () {
  try {
    const readFile = await fs.open("./src.txt", "r");
    const writeFile = await fs.open("./dest.txt", "w");

    const readFileHandler = readFile.createReadStream(); // default internal buffer size 64kb
    const writeFileHandler = writeFile.createWriteStream(); // default internal buffer size 16kb

    readFileHandler.on("data", (chunk) => {
      if (!writeFileHandler.write(chunk)) {
        readFileHandler.pause();
      }
    });
    writeFileHandler.on("drain", () => {
      readFileHandler.resume();
    });
  } catch (error) {
    console.log(error);
  }
})();
