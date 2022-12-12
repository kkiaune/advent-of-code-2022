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

const getShortestRouteDistance = (startPositions) => {
  const gridRows = grid.length;
  const gridRowColumns = grid[0].length;
  const distances = [];

  startPositions.forEach((startPos) => {
    let visited = new Set();
    let queue = [[...startPos, 0]];

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
        if (grid[newRow][newColumn] - grid[row][column] > 1) {
          continue;
        }

        // new position is at the end
        if (newRow === end[0] && newColumn === end[1]) {
          distances.push(distance + 1);
          queue = [];
          break;
        }

        visited.add(newRow + "-" + newColumn);
        queue.push([newRow, newColumn, distance + 1]);
      }
    }
  });

  return Math.min(...distances);
};

console.log("first part result:", getShortestRouteDistance([start]));

console.log(
  "second part result:",
  getShortestRouteDistance(
    grid.reduce((acc, row, rowIndex) => {
      row.forEach(
        (column, columnIndex) =>
          column === "a".charCodeAt(0) && acc.push([rowIndex, columnIndex])
      );
      return acc;
    }, [])
  )
);
