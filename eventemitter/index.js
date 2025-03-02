const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter();

myEmitter.on("foo", function () {
  console.log("Event emitted 1");
});
myEmitter.on("foo", function () {
  console.log("Event emitted 2");
});
myEmitter.on("foo", function () {
  console.log("Event emitted 3");
});
myEmitter.on("foo", function () {
  console.log("Event emitted 4");
});

//  Will only be called once

myEmitter.on("bar", function () {
  console.log("bar", this);
});

myEmitter.emit("foo"); // Event emitted
