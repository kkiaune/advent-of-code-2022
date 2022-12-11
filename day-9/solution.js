const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

const moveTail = (head, tail) => {
  const xDiff = tail[0] - head[0];
  const yDiff = tail[1] - head[1];

  if (Math.abs(xDiff) === 2 && Math.abs(yDiff) === 2) {
    tail[0] = xDiff < 0 ? head[0] - 1 : head[0] + 1;
    tail[1] = yDiff < 0 ? head[1] - 1 : head[1] + 1;
  } else if (Math.abs(xDiff) === 2 && Math.abs(yDiff) !== 2) {
    tail[0] = xDiff < 0 ? head[0] - 1 : head[0] + 1;
    tail[1] = head[1];
  } else if (Math.abs(xDiff) !== 2 && Math.abs(yDiff) === 2) {
    tail[0] = head[0];
    tail[1] = yDiff < 0 ? head[1] - 1 : head[1] + 1;
  } else {
    tail = [head[0] + xDiff, head[1] + yDiff];
  }

  return tail;
};

const getTailVisitedPos = (knotsLength) => {
  let knots = new Array(knotsLength).fill(null).map(() => [0, 0]);
  const visitedPositions = new Array(knotsLength)
    .fill(null)
    .map(() => new Set());

  list.forEach((command) => {
    let [direction, count] = command.split(" ");

    for (let i = 0; i < +count; i++) {
      if (direction === "U") {
        knots[0][0] -= 1;
      } else if (direction === "R") {
        knots[0][1] += 1;
      } else if (direction === "D") {
        knots[0][0] += 1;
      } else if (direction === "L") {
        knots[0][1] -= 1;
      }

      visitedPositions[0].add(knots[0].join(","));

      for (let j = 1; j < knotsLength; j++) {
        knots[j] = moveTail(knots[j - 1], knots[j]);
        visitedPositions[j].add(knots[j].join(","));
      }
    }
  });

  return visitedPositions;
};

const visitedPositions = getTailVisitedPos(10);

console.log("first part result:", visitedPositions[0].size);
console.log("second part result:", visitedPositions[9].size);
