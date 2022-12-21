const fs = require("fs");
const nerdamer = require("nerdamer");
require("nerdamer/Solve");
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

const getMonkeyResult = (monkeyName) => {
  if (typeof monkeysActions[monkeyName] === "number" || monkeyName === "humn") {
    return monkeysActions[monkeyName];
  }

  const [monkey1, operation, monkey2] = monkeysActions[monkeyName].split(" ");
  const firstMonkeyResult = getMonkeyResult(monkey1);
  const secondMonkeyResult = getMonkeyResult(monkey2);

  return `(${firstMonkeyResult})${operation}(${secondMonkeyResult})`;
};

console.log("first part result:", eval(getMonkeyResult("root")).toString());

monkeysActions["root"] = monkeysActions["root"].replace(/(\+|\/|\*|\-)/, "=");
monkeysActions["humn"] = "x";

console.log(
  "second part result:",
  nerdamer.solveEquations(getMonkeyResult("root"), "x").toString()
);
