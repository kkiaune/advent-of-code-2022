const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");

let mexDepth = 0;

const getBoard = () =>
  new Set(
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
              mexDepth = Math.max(mexDepth, Math.max(y1, y2));
            }
          }
        }
        return acc;
      }, [])
  );

const getFirstPartResult = () => {
  const board = getBoard();
  let sandUnits = 0;
  let breakSygnal = false;

  while (!breakSygnal) {
    let sandGrain = [500, 0];

    while (true) {
      if (sandGrain[1] >= mexDepth) {
        breakSygnal = true;
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

  return sandUnits;
};

const getSecondPartResult = () => {
  const board = getBoard();
  let sandUnits = 0;

  while (!board.has("500,0")) {
    let sandGrain = [500, 0];

    while (true) {
      if (sandGrain[1] >= mexDepth + 1) {
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

      break;
    }

    board.add(`${sandGrain[0]},${sandGrain[1]}`);
    sandUnits += 1;
  }

  return sandUnits;
};

console.log("first part result:", getFirstPartResult());
console.log("second part result:", getSecondPartResult());
