const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

let x = 1;
let cycle = 0;
let strongestSignalSum = 0;
let CRT = new Array(6).fill(null).map(() => []);

list.forEach((line) => {
  const [operation, amount] = line.split(" ");
  let iterations = operation === "noop" ? 1 : 2;

  new Array(iterations).fill().forEach((_, index) => {
    CRT[Math.floor(cycle / 40)].push(
      (cycle % 40) - 1 <= x && x <= (cycle % 40) + 1 ? "#" : "."
    );

    cycle += 1;

    if (cycle % 40 === 20) {
      strongestSignalSum += x * cycle;
    }

    if (index > 0) {
      x += +amount;
    }
  });
});

console.log("first part result:", strongestSignalSum);
console.log("second part result:");
CRT.forEach((row) => console.log(row.join("")));
