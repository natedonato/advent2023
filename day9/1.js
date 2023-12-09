const fs = require("fs");
let input = fs.readFileSync("day9/input.txt", "utf-8").split("\n");
// let input = fs.readFileSync("day9/sample.txt", "utf-8").split("\n");

input = input.map((el) => el.split(" ").map((el) => parseInt(el)));

let sum = 0;

for (const line of input) {
  let set = [line];

  while (!set[set.length - 1].every((el) => el === 0)) {
    let prev = set[set.length - 1];
    let next = [];

    for (let i = 1; i < prev.length; i++) {
      next.push(prev[i] - prev[i - 1]);
    }
    set.push(next);
  }

  set[set.length - 1].push(0);

  for (let i = set.length - 2; i >= 0; i--) {
    let l = set[i + 1].length - 1;
    set[i].push(set[i + 1][l] + set[i][set[i].length - 1]);
  }

  let next_value = set[0][set[0].length - 1];
  console.log(next_value);
  sum += next_value;
}

console.log("\n");
console.log("sum", sum);
