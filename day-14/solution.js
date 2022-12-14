const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");

let mexDepth = 0;
const board = new Set(
  list
    .split(/\r?\n/)
    .map((line) =>
      line.split(" -> ").map((point) => point.split(",").map((val) => +val))
    )
    .reduce((acc, line) => {
      for (let i = 0; i < line.length - 1; i++) {
        let [x1, y1] = line[i];
        let [x2, y2] = line[i + 1];
        x1 = +x1;
        y1 = +y1;
        x2 = +x2;
        y2 = +y2;

        for (let x = 0; x < Math.abs(x2 - x1) + 1; x++) {
          for (let y = 0; y < Math.abs(y2 - y1) + 1; y++) {
            acc.push(
              `${x1 > x2 ? x2 + x : x1 + x},${y1 > y2 ? y2 + y : y1 + y}`
            );
            mexDepth = Math.max(mexDepth, y1 + y);
          }
        }
      }
      return acc;
    }, [])
);

let sandUnits = 0;
let foundTheVoid = false;

while (!foundTheVoid) {
  let sandGrain = [500, 0];

  while (true) {
    if (sandGrain[1] >= mexDepth) {
      foundTheVoid = true;
      break;
    }

    // no grain on bottom
    if (!board.has(`${sandGrain[0]},${sandGrain[1] + 1}`)) {
      sandGrain[1] += 1;
      continue;
    }

    // no grain on the left diagonally
    if (!board.has(`${sandGrain[0] - 1},${sandGrain[1] + 1}`)) {
      sandGrain[0] -= 1;
      continue;
    }

    // no grain on the right diagonally
    if (!board.has(`${sandGrain[0] + 1},${sandGrain[1] + 1}`)) {
      sandGrain[0] += 1;
      continue;
    }

    board.add(`${sandGrain[0]},${sandGrain[1]}`);
    sandUnits += 1;
    break;
  }
}

console.log("first part result:", sandUnits);
