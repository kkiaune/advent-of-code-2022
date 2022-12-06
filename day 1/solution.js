const fs = require("fs");
let listOfCalories = fs.readFileSync("input.txt", "utf-8");
listOfCalories = listOfSuplies.split(/\r?\n/);

const elfsCalories = [];
let sumOfElfCalories = 0;

listOfCalories.forEach((calories) => {
  if (!calories.length) {
    elfsCalories.push(sumOfElfCalories);
    sumOfElfCalories = 0;
  } else {
    sumOfElfCalories += +calories;
  }
});

console.log("first part result:", Math.max(...elfsCalories));

const sortedElfsCalories = elfsCalories.sort((a, b) => b - a);
console.log(
  "second part result:",
  sortedElfsCalories[0] + sortedElfsCalories[1] + sortedElfsCalories[2]
);
