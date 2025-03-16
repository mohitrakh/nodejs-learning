import { Writable } from "node:stream";
import fs from "fs";

// Creating our own writeable stream

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.highWaterMark = highWaterMark;
    this.fileName = fileName;
    this.fd = null; // initializing file descriptor(fd) as null
    this.chunks = [];
    this.chunkSize = 0;
    this.totalWrites = 0;
  }

  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    console.log(this.fd);
    this.chunks.push(chunk);
    this.chunkSize += this.chunks.length;

    if (this.chunkSize > this.writableHighWaterMark) {
      console.log("LOG:001");
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        console.log("LOG:002");
        if (err) return callback(err);
        this.chunks = [];
        this.chunkSize = 0;
        ++this.totalWrites;
        console.log("LOG:003");
        callback();
      });
    } else {
      console.log("LOG:004");
      callback();
      // callback: If you dont pass anything node will think writing is successffull
      // if you pass smtth it will be treat callback as error
      // just like the next() function in the express/node js middleware
    }
  }

  // this _final will only be called if you we call end on our stream

  _final(callback) {
    console.log("LOG:005");
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      console.log("LOG:006", err);
      if (err) return callback(err);
      this.chunks = [];
      this.chunkSize = 0;
      ++this.totalWrites;
      console.log("LOG:007");
      callback();
    });
  }

  // destroy will run after the final is done
  // function that is associated with class is called method e.g = _destroy _final
  _destroy(error, callback) {
    console.log("Number of writes", this.totalWrites);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback();
    }
  }
}

const writeStream = new FileWriteStream({
  highWaterMarkValue: 1800,
  fileName: "text.txt",
});

writeStream.write(Buffer.from("Hello writing to my custom stream"));
writeStream.end(Buffer.from("\nGooogoo GAGA"));
