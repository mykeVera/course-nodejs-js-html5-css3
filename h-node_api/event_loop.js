const fs = require("fs");

console.log("A) Inicio");

process.nextTick(() => console.log("B) nextTick"));

Promise.resolve().then(() => console.log("C) Promise"));

setTimeout(() => console.log("D) setTimeout 0"), 0);

setImmediate(() => console.log("E) setImmediate"));

fs.readFile(__filename, () => {
  console.log("F) readFile callback");

  process.nextTick(() => console.log("G) nextTick dentro de readFile"));

  Promise.resolve().then(() => console.log("H) Promise dentro de readFile"));

  setTimeout(() => console.log("I) setTimeout dentro readFile"), 0);

  setImmediate(() => console.log("J) setImmediate dentro readFile"));
});

console.log("K) Fin");