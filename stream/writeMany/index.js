const fs = require("fs/promises");
(async function streamData() {
  try {
    const fileHandler = await fs.open("./ex.txt", "w");

    const writeStream = fileHandler.createWriteStream();

    console.log(
      writeStream.writableHighWaterMark,
      "size of internal buffer for stream"
    );
    console.log(writeStream.writableLength);
    console.log(writeStream);

    let i = 0;
    // function that will write on stream
    function writeMany() {
      while (i < 1000000) {
        let buff = Buffer.from(` ${i} `, "utf-8");

        // stop the writing after reaching the end of the loop
        if (i === 99999) {
          return writeStream.end(buff);
          // any writing after this will give error so return
        }

        // writeStream.write(buff) this will return boolean,
        // this boolean means that if the stream is filled or not true == okay to write, false == filled
        if (!writeStream.write(buff)) break;
        i++;
        // if its filled we will breka the loop
      }
    }
    writeMany();
    // this drain means the stream is getting emptied
    writeStream.on("drain", () => {
      // after getting emptied i want to re-run the code to write again
      writeMany();
    });
    writeStream.on("finish", () => {
      fileHandler.close();
    });
  } catch (error) {
    console.log(error);
  }
})();
