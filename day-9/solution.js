const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

let head = [0, 0];
let tail = [0, 0];
const visitedPos = new Set();

list.every((command) => {
  let [direction, count] = command.split(" ");

  new Array(+count).fill(null).forEach(() => {
    if (direction === "U") {
      head[0] -= 1;
    } else if (direction === "R") {
      head[1] += 1;
    } else if (direction === "D") {
      head[0] += 1;
    } else if (direction === "L") {
      head[1] -= 1;
    }

    const xDiff = tail[0] - head[0];
    const yDiff = tail[1] - head[1];

    if (xDiff === 2) {
      tail = [head[0] + 1, head[1]];
    } else if (yDiff === 2) {
      tail = [head[0], head[1] + 1];
    } else if (xDiff === -2) {
      tail = [head[0] - 1, head[1]];
    } else if (yDiff === -2) {
      tail = [head[0], head[1] - 1];
    } else {
      tail = [head[0] + xDiff, head[1] + yDiff];
    }

    visitedPos.add(tail.join(","));
  });

  return true;
});

console.log("first part result:", visitedPos.size);
// console.log("second part result:", highestScenicScore);
