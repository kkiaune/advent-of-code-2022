const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");

const signalPairs = list
  .split(/\r?\n/)
  .filter(Boolean)
  .reduce((acc, line, index) => {
    const pairIndex = Math.floor(index / 2);
    acc[pairIndex] = (acc[pairIndex] ?? []).concat([JSON.parse(line)]);
    return acc;
  }, []);

console.log(signalPairs);

// console.log("first part result:", );
