const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

const getResult = (isNeverCrane = false) => {
  const cargo = [];

  list.map((line) => {
    if (/\[|\]/.test(line)) {
      const updatedLine = line.replaceAll("    ", " x "); // empty column;
      const stacks = updatedLine.split(" ").filter(Boolean);

      stacks.forEach((el, i) => {
        if (el === "x") {
          return;
        }

        if (!cargo[i]?.length) {
          cargo[i] = [el];
        } else {
          cargo[i].push(el);
        }
      });
    }
  });

  list.map((line) => {
    if (/move/.test(line)) {
      const [amount, from, to] = line
        .split(" ")
        .filter((el) => /[1-9]/.test(el))
        .map((el, idx) => (idx === 0 ? +el : el - 1));

      let elementsToMove = cargo[from].splice(0, amount);

      if (!isNeverCrane) {
        elementsToMove = elementsToMove.reverse();
      }

      cargo[to].unshift(...elementsToMove);
    }
  });

  return cargo
    .map((stack) => stack[0].replace("[", "").replace("]", ""))
    .join("");
};

console.log("first part result", getResult());
console.log("second part result", getResult(true));
