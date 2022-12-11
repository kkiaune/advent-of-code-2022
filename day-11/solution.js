const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/).filter(Boolean);

const getMonkeysData = () =>
  list.reduce((acc, line, index) => {
    line = line.trim();
    const monkey = Math.floor(index / 6);
    let items, operation, divisibleBy, trueMonkeyIndex, falseMonkeyIndex;

    if (line.startsWith("Starting items:")) {
      items = line
        .replace("Starting items: ", "")
        .split(", ")
        .map((item) => +item);
    } else if (line.startsWith("Operation:")) {
      operation = eval(
        line.replace("Operation: ", "").replace("new = ", "(old) =>")
      );
    } else if (line.startsWith("Test:")) {
      divisibleBy = +line.match(/\d+/);
    } else if (line.startsWith("If true:")) {
      trueMonkeyIndex = +line.match(/\d+/);
    } else if (line.startsWith("If false:")) {
      falseMonkeyIndex = +line.match(/\d+/);
    }

    acc[monkey] = {
      ...(acc[monkey] ?? {}),
      ...(items ? { items } : {}),
      ...(operation ? { operation } : {}),
      ...(divisibleBy ? { divisibleBy } : {}),
      ...(trueMonkeyIndex !== undefined ? { trueMonkeyIndex } : {}),
      ...(falseMonkeyIndex !== undefined ? { falseMonkeyIndex } : {}),
      inspectedItemsCount: acc[monkey]?.inspectedItemsCount ?? 0,
    };

    return acc;
  }, []);

const getTopTwoPerformingMonkeys = (rounds, part) => {
  let monkeys = getMonkeysData();
  // for second part we want to know if item divisible by all possible divisions
  const allDivisions = monkeys.reduce(
    (acc, { divisibleBy }) => acc * divisibleBy,
    1
  );

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        monkey.inspectedItemsCount += 1;
        const adjustedItem =
          part === 1
            ? Math.floor(monkey.operation(item) / 3)
            : monkey.operation(item) % allDivisions;
        if (adjustedItem % monkey.divisibleBy === 0) {
          monkeys[monkey.trueMonkeyIndex].items.push(adjustedItem);
        } else {
          monkeys[monkey.falseMonkeyIndex].items.push(adjustedItem);
        }
      });
      monkey.items = [];
    });
  }

  return monkeys
    .map(({ inspectedItemsCount }) => inspectedItemsCount)
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((a, b) => a * b, 1);
};

console.log("first part result:", getTopTwoPerformingMonkeys(20, 1));
console.log("second part result:", getTopTwoPerformingMonkeys(10000, 2));
