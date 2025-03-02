// const memoryContainer = new Buffer.from("hello", "utf-8");

// console.log(memoryContainer.toString());

const memoryContainer = Buffer.alloc(3);
memoryContainer[0] = 72;

console.log(Buffer.poolSize);
