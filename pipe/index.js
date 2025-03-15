import fs from "fs/promises";
import { pipeline } from "node:stream";
async function pipeNodeFeature() {
  try {
    console.time("write");
    const writeFileHandler = await fs.open("dest.txt", "w");
    const readFileHandler = await fs.open("text.txt", "r");

    const writeStream = writeFileHandler.createWriteStream();
    const readStream = readFileHandler.createReadStream();

    // pipe is mechanism that allows data to be passed from
    // one stream to another stream

    // readStream.pipe(writeStream); // PIPE : no error handling will have to manually destroy the stream
    pipeline(readStream, writeStream, (err) => {
      if (err) {
        console.log("Got error");
      } else {
        console.log("Successfull");
      }
    });
    // PIPELINE : with error handling will destroy the all stream if error occurs
    console.timeEnd("write");
  } catch (error) {
    console.log(error);
  }
}

pipeNodeFeature();
