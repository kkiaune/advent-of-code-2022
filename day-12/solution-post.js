const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");

let start = [];
let end = [];
const grid = list
  .split(/\r?\n/)
  .reduce((acc, line) => acc.concat([line.split("")]), [])
  .map((row, rowIndex) => {
    return row.map((columnElement, columnIndex) => {
      if (columnElement === "S") {
        start = [rowIndex, columnIndex];
        return "a".charCodeAt(0);
      } else if (columnElement === "E") {
        end = [rowIndex, columnIndex];
        return "z".charCodeAt(0);
      }
      return columnElement.charCodeAt(0);
    });
  });

const logShortestRouteDistance = (startPos, part) => {
  const gridRows = grid.length;
  const gridRowColumns = grid[0].length;

  let visited = new Set();
  let queue = [[...startPos, 0]];
  let totalDistance = 0;

  while (queue.length) {
    const [row, column, distance] = queue.shift();

    const positions = [
      [row - 1, column], // top position
      [row + 1, column], // bottom position
      [row, column - 1], // left position
      [row, column + 1], // right position
    ];

    for (let i = 0; i < positions.length; i++) {
      const [newRow, newColumn] = positions[i];

      // new position outside the range
      if (
        newRow < 0 ||
        newRow >= gridRows ||
        newColumn < 0 ||
        newColumn >= gridRowColumns
      ) {
        continue;
      }

      // new position already visited
      if (visited.has(newRow + "-" + newColumn)) {
        continue;
      }

      // new position is too high to climb next
      if (
        (part === 1 && grid[newRow][newColumn] - grid[row][column] > 1) ||
        (part === 2 && grid[newRow][newColumn] - grid[row][column] < -1)
      ) {
        continue;
      }

      if (
        (part === 1 && newRow === end[0] && newColumn === end[1]) ||
        (part === 2 && grid[newRow][newColumn] === "a".charCodeAt(0))
      ) {
        totalDistance = distance + 1;
        queue = [];
        break;
      }

      visited.add(newRow + "-" + newColumn);
      queue.push([newRow, newColumn, distance + 1]);
    }
  }

  return totalDistance;
};

console.log("first part result:", logShortestRouteDistance(start, 1));
console.log("second part result:", logShortestRouteDistance(end, 2));
