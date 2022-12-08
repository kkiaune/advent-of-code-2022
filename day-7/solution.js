const fs = require("fs");
const path = require("path");
let list = fs.readFileSync("input.txt", "utf-8");
list = list.split(/\r?\n/);

/**
 * map of { dir: size }
 * expected outcome:
 * {
 *   '/': 48381165
 *   '/a/': 94853
 *   '/a/e/': 584
 *   '/d/': 24933642
 * }
 */
const directories = {};
/**
 * map of { file: size }
 * expected outcome:
 * {
 *   '/b.txt': 14848514
 *   '/c.txt': 8504156
 *   '/a/f': 29116
 *   '/a/g': 2557
 *   '/a/h.lst': 62596
 *   '/a/e/i': 584
 *   '/d/j': 4060174
 *   '/d/d.log': 8033020
 *   '/d/d.ext': 5626152
 *   '/d/k': 7214296
 * }
 */
const files = {};

let currentDirPath = "";

list.every((output) => {
  if (output.includes("$ cd ")) {
    if (output.includes("/")) {
      currentDirPath = "/";
    } else if (output.includes("..")) {
      currentDirPath = currentDirPath.split("/").slice(0, -2).join("/") + "/";
    } else {
      currentDirPath = currentDirPath + output.replace("$ cd ", "") + "/";
    }
    directories[currentDirPath] = 0;
    return true;
  }

  if (!output.includes("$ ls")) {
    const [sizeOrType, name] = output.split(" ");
    if (sizeOrType !== "dir") {
      files[currentDirPath + name] = +sizeOrType;
    }
  }

  return true;
});

(function calculateDirectoriesSizes() {
  Object.keys(directories).forEach((dirPath) => {
    Object.keys(files).forEach((filePath) => {
      if (filePath.startsWith(dirPath)) {
        directories[dirPath] += files[filePath];
      }
    });
  });
})();

console.log(
  "first part result:",
  Object.values(directories)
    .filter((size) => size <= 100000)
    .reduce((acc, size) => acc + size, 0)
);

const neededMinimum = 30000000 - (70000000 - directories["/"]);

console.log(
  "second part result:",
  Math.min(...Object.values(directories).filter((size) => size > neededMinimum))
);
