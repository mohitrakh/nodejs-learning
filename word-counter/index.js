import fs from "fs/promises";

async function countWords() {
  try {
    const fileHandler = await fs.open("text.txt", "r");
    const readStream = fileHandler.createReadStream();
    let totalWords = 0;
    readStream.on("data", (chunk) => {
      const words = chunk.toString().split(/\s+/);
      totalWords += words.length;
    });
    readStream.on("end", () => {
      console.log(`Total word count: ${totalWords}`);
      fileHandler.close(); // Close file after reading
    });

    readStream.on("error", (err) => {
      console.error("Error reading file:", err);
    });
  } catch (error) {
    console.log(error);
  }
}

countWords();
