const fs = require("fs");
let listOfCombinations = fs.readFileSync("input.txt", "utf-8");
listOfCombinations = listOfCombinations.split(/\r?\n/);

const shape = {
  ROCK: "A",
  PAPPER: "B",
  SCIZORS: "C",
};

const pointsPerShape = {
  [shape.ROCK]: 1,
  [shape.PAPPER]: 2,
  [shape.SCIZORS]: 3,
};

const possibleOutcomes = {
  [shape.ROCK + shape.ROCK]: 3, // draw
  [shape.ROCK + shape.PAPPER]: 6, // win
  [shape.ROCK + shape.SCIZORS]: 0, // loss
  [shape.PAPPER + shape.ROCK]: 0, // loss
  [shape.PAPPER + shape.PAPPER]: 3, // draw
  [shape.PAPPER + shape.SCIZORS]: 6, // win
  [shape.SCIZORS + shape.ROCK]: 6, // win
  [shape.SCIZORS + shape.PAPPER]: 0, // loss
  [shape.SCIZORS + shape.SCIZORS]: 3, // draw
};

const getScore = (strategy) => {
  let score = 0;

  listOfCombinations.forEach((combination) => {
    const [oponentShape, myMove] = combination.split(" ");
    // console.log("oponents move %s, my move %s", oponentShape, myMove);

    const myShape = strategy?.({ oponentShape, myMove }) ?? shape.ROCK;

    score += pointsPerShape[myShape];
    score += possibleOutcomes[oponentShape + myShape];
  });

  return score;
};

// A, X - rock
// B, Y - papper
// C, Z - scisors

const firstSolutionStrategy = ({ myMove }) =>
  ({
    X: shape.ROCK,
    Y: shape.PAPPER,
    Z: shape.SCIZORS,
  }[myMove]);

console.log("first part result:", getScore(firstSolutionStrategy));

// A - rock
// B - papper
// C - scisors
// X - need to loose
// Y - need to draw
// Z - need to win

const secondSolutionStrategy = ({ oponentShape, myMove }) =>
  ({
    [shape.ROCK]: {
      X: shape.SCIZORS,
      Y: shape.ROCK,
      Z: shape.PAPPER,
    },
    [shape.PAPPER]: {
      X: shape.ROCK,
      Y: shape.PAPPER,
      Z: shape.SCIZORS,
    },
    [shape.SCIZORS]: {
      X: shape.PAPPER,
      Y: shape.SCIZORS,
      Z: shape.ROCK,
    },
  }[oponentShape][myMove]);

console.log("second part result:", getScore(secondSolutionStrategy));
