const fs = require("fs");
const listOfCalories = fs.readFileSync("input.txt", "utf-8");

const elfsCalories = [];
let sumOfElfCalories = 0;

listOfCalories.split(/\r?\n/).forEach((calories) => {
  if (!calories.length) {
    elfsCalories.push(sumOfElfCalories);
    sumOfElfCalories = 0;
  } else {
    sumOfElfCalories += +calories;
  }
});

console.log("first part solution", Math.max(...elfsCalories));

const sortedElfsCalories = elfsCalories.sort((a, b) => b - a);
console.log(
  "second part solution",
  sortedElfsCalories[0] + sortedElfsCalories[1] + sortedElfsCalories[2]
);
