const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

let firstPartResult = 0;
let secondPartResult = 0;

list.map((sections) => {
  const [first, second] = sections.split(/,/);
  let [firstStart, firstEnd] = first.split(/-/);
  let [secondStart, secondEnd] = second.split(/-/);
  firstStart = +firstStart;
  firstEnd = +firstEnd;
  secondStart = +secondStart;
  secondEnd = +secondEnd;

  if (
    (firstStart <= secondStart && secondEnd <= firstEnd) ||
    (secondStart <= firstStart && firstEnd <= secondEnd)
  ) {
    firstPartResult += 1;
  }

  if (!(firstEnd < secondStart || secondEnd < firstStart)) {
    secondPartResult += 1;
  }
});

console.log("first part result:", firstPartResult);
console.log("second part result:", secondPartResult);
