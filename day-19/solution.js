const fs = require("fs");
let list = fs.readFileSync("example.txt", "utf-8");
list = list.split(/\r?\n/);

console.log("first part result: TBD");
console.log("second part result:");
