const fs = require("fs");
const list = fs.readFileSync("input.txt", "utf-8");
const grid = list.split(/\r?\n/).map((trees) => trees.split(""));

const getIsTreeVisible = ({
  tree,
  topElements,
  bottomElements,
  leftElements,
  rightElements,
}) =>
  topElements.every((el) => el < tree) ||
  bottomElements.every((el) => el < tree) ||
  leftElements.every((el) => el < tree) ||
  rightElements.every((el) => el < tree);

const getScenicScore = ({
  tree,
  topElements,
  bottomElements,
  leftElements,
  rightElements,
}) => {
  const calculateScore = (elements) => {
    const score = elements.findIndex((el) => el >= tree);

    if (score < 0) {
      return elements.length;
    }

    return score + 1;
  };

  return (
    calculateScore(topElements) *
    calculateScore(bottomElements) *
    calculateScore(leftElements) *
    calculateScore(rightElements)
  );
};

let visibleTreesCount = 0;
let highestScenicScore = 0;
const length = grid.length;

for (let i = 0; i < length; i++) {
  for (let j = 0; j < length; j++) {
    if (j - 1 < 0 || j + 1 === length || i - 1 < 0 || i + 1 === length) {
      visibleTreesCount += 1;
    } else {
      const tree = grid[i][j];
      const columnElements = Array(length)
        .fill(null)
        .map((_, index) => index)
        .map((index) => grid[index][j]);

      const topElements = columnElements.slice(0, i).reverse();
      const bottomElements = columnElements.slice(i + 1, length);
      const leftElements = grid[i].slice(0, j).reverse();
      const rightElements = grid[i].slice(j + 1, length);

      if (
        getIsTreeVisible({
          tree,
          topElements,
          bottomElements,
          leftElements,
          rightElements,
        })
      ) {
        visibleTreesCount += 1;
      }

      const scenicScore = getScenicScore({
        tree,
        topElements,
        bottomElements,
        leftElements,
        rightElements,
      });

      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }
}

console.log("first part result:", visibleTreesCount);
console.log("second part result:", highestScenicScore);
