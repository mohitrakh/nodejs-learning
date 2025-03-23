import fs from "fs/promises";
import path from "path";

function formateSize(bytes) {
  let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (bytes >= 1024 && i < sizes.length) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${sizes[i]}`;
}

async function calculateSizeOfDir(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    console.log(files);
    let totalSize = 0;
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileState = await fs.stat(filePath);

      if (fileState.isFile()) {
        totalSize += fileState.size;
      }
    }
    console.log(formateSize(totalSize));
  } catch (error) {
    console.log(error);
  }
}

calculateSizeOfDir("./hello");
