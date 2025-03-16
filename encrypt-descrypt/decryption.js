import { Transform } from "node:stream";
import fs from "node:fs/promises";
class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 0) {
        chunk[i] = chunk[i] - 1;
      }
    }
    this.push(chunk);
    callback();
  }
}

async function readWriteFun() {
  try {
    const decrypt = new Decrypt();
    const readFileHandlerr = await fs.open("dest.txt", "r");
    const writeFileHandler = await fs.open("desc.txt", "w");
    const readStream = readFileHandlerr.createReadStream();
    const writeStream = writeFileHandler.createWriteStream();

    readStream.pipe(decrypt).pipe(writeStream);
  } catch (error) {}
}

readWriteFun();
