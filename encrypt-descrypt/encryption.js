import { Transform } from "node:stream";
import fs from "node:fs/promises";
class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 255) {
        chunk[i] = chunk[i] + 1;
      }
    }
    this.push(chunk);
    callback();
  }
}

async function readWriteFun() {
  try {
    const encrypt = new Encrypt();
    const readFileHandlerr = await fs.open("src.txt", "r");
    const writeFileHandler = await fs.open("dest.txt", "w");
    const readStream = readFileHandlerr.createReadStream();
    const writeStream = writeFileHandler.createWriteStream();

    readStream.pipe(encrypt).pipe(writeStream);
  } catch (error) {}
}

readWriteFun();
