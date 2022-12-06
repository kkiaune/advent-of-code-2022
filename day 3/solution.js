const fs = require("fs");
let listOfSuplies = fs.readFileSync("input.txt", "utf-8");
listOfSuplies = listOfSuplies.split(/\r?\n/);

const getDuplicateLettersInSackCompartmanets = () =>
  listOfSuplies.map((suplies) => {
    const firstSack = suplies.slice(0, suplies.length / 2);
    const secondSack = suplies.slice(suplies.length / 2);

    return [...firstSack].find((letter) => secondSack.includes(letter));
  });

const getDuplicateLettersInMultipleSacks = () => {
  const groupedSacks = [];

  while (listOfSuplies.length) {
    groupedSacks.push(listOfSuplies.splice(0, 3));
  }

  return groupedSacks.map(([firstSack, secondSack, thirdSack]) =>
    [...firstSack].find(
      (letter) => secondSack.includes(letter) && thirdSack.includes(letter)
    )
  );
};

const getPrioritiesSum = (listOfLetters) => {
  let prioritiesSum = 0;

  listOfLetters.forEach((letter) => {
    if (letter.toUpperCase() === letter) {
      prioritiesSum += letter.charCodeAt(0) - 38;
    } else {
      prioritiesSum += letter.charCodeAt(0) - 96;
    }
  });

  return prioritiesSum;
};

console.log(
  "first solution:",
  getPrioritiesSum(getDuplicateLettersInSackCompartmanets())
);
console.log(
  "first solution:",
  getPrioritiesSum(getDuplicateLettersInMultipleSacks())
);
