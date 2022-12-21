const fs = require("fs");
// let list = fs.readFileSync("example.txt", "utf-8");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

let monkeysActions = list.reduce((acc, line) => {
  const [monkey, action] = line.split(": ");

  return {
    ...acc,
    [monkey]: /^\d+$/.test(action) ? +action : action,
  };
}, {});

console.log("monkeysActions", monkeysActions);

const getMonkeyResult = (monkeyName) => {
  if (typeof monkeysActions[monkeyName] === "number") {
    return monkeysActions[monkeyName];
  }

  const [monkey1, operation, monkey2] = monkeysActions[monkeyName].split(" ");

  return eval(getMonkeyResult(monkey1) + operation + getMonkeyResult(monkey2));
};

console.log("first part result:", getMonkeyResult("root"));

const getMonkeyResultPart2 = (monkeyName) => {
  if (typeof monkeysActions[monkeyName] === "number") {
    return monkeysActions[monkeyName];
  }

  let [monkey1, operation, monkey2] = monkeysActions[monkeyName].split(" ");

  const firstMonkeyResult = getMonkeyResult(monkey1);
  const secondMonkeyResult = getMonkeyResult(monkey2);

  if (monkeyName === "root") {
    operation = "===";
    console.log("firstMonkeyResult", firstMonkeyResult);
    console.log("secondMonkeyResult", secondMonkeyResult);
  }

  return eval(firstMonkeyResult + operation + secondMonkeyResult);
};

console.log("second part result:", getMonkeyResultPart2("root"));
