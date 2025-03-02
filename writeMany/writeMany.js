import fs from "fs/promises";

(async () => {
  let filee = await fs.open("./text.txt", "a");
  for (var i = 0; i < 10; i++) {
    await filee.writeFile(`Line ${i + 1}\n`);
  }
})();
