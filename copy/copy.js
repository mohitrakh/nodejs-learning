import fs from "fs/promises";

(async () => {
  try {
    const srcFile = await fs.open("text.txt", "r");
    const destFile = await fs.open("dest.txt", "w");

    let byteRead = -1;

    while (byteRead !== 0) {
      // because of this code we had lots of null value in the dest.txt file
      // because buffer was half filled with zero that why
      // so the solution for that is
      // Check if the buffer is fully field if not
      // each buffer has size of 16384 bytes if buffer has less value then it is fully filled
      // so check first
      const data = await srcFile.read();
      byteRead = data.bytesRead;
      if (data.bytesRead !== 16384) {
        // find the first index where zero occurs in buffer
        // from that position buffer was empty filled with zero
        const indexOfZero = data.buffer.indexOf(0);
        // create new buffer
        //  allocated the size from the 0 to the index where buffer was field
        const newBuffer = Buffer.alloc(indexOfZero);
        // now copy the values that were filled in OG buffer data.buffer to the newBuffer
        data.buffer.copy(newBuffer, 0, 0, indexOfZero);
        destFile.write(newBuffer); // newBuffer was wrote in the dest
      } else {
        destFile.write(data.buffer);
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
