const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;
const visitedPos = new Set();

list.every((command) => {
  let [direction, count] = command.split(" ");

  new Array(+count).fill(null).forEach(() => {
    if (direction === "U") {
      headX -= 1;
    } else if (direction === "R") {
      headY += 1;
    } else if (direction === "D") {
      headX += 1;
    } else if (direction === "L") {
      headY -= 1;
    }

    const xDiff = tailX - headX;
    const yDiff = tailY - headY;

    if (xDiff === 2) {
      tailX = headX + 1;
      tailY = headY;
    } else if (yDiff === 2) {
      tailX = headX;
      tailY = headY + 1;
    } else if (xDiff === -2) {
      tailX = headX - 1;
      tailY = headY;
    } else if (yDiff === -2) {
      tailX = headX;
      tailY = headY - 1;
    } else {
      tailX = headX + xDiff;
      tailY = headY + yDiff;
    }

    visitedPos.add(`${tailX},${tailY}`);
  });

  return true;
});

console.log("first part result:", visitedPos.size);
// console.log("second part result:", highestScenicScore);
