const fs = require("fs");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/)[0].split("");

const getMarkerPosition = (bufferSize) => {
  let marker = 0;
  let buffer = [];

  list.every((letter, letterIndex) => {
    buffer.push(letter);

    if (letterIndex >= bufferSize) {
      buffer.shift();
    } else {
      return true;
    }

    const duplicates = buffer.filter(
      (item, index) => buffer.indexOf(item) !== index
    );

    if (duplicates.length === 0) {
      marker = letterIndex + 1;
      return false;
    }

    return true;
  });

  return marker;
};

console.log("first part result", getMarkerPosition(4));
console.log("second part result", getMarkerPosition(14));
