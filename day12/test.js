const fs = require("fs");
let input = fs.readFileSync("./day12/input.txt", "utf-8");
const memo = {};

input = input.split("\n").map((el) => el.split(" "));

for (let i = 0; i < input.length; i++) {
  let [spring, count] = input[i];

  let newSpring = "";
  let newCount = "";

  for (let i = 0; i < 5; i++) {
    newSpring += spring + "?";
    newCount += count + ",";
  }
  newSpring = newSpring.slice(0, -1);
  newCount = newCount.slice(0, -1);

  input[i] = [newSpring, newCount];
}

let max = 0;
for(const line of input){
  let val = countUnknowns(line[0])
  if(val > max){
    max = val
  }
}

console.log(max)

function countUnknowns(springs) {
  let count = 0;
  for (let i = 0; i < springs.length; i++) {
    if (springs[i] === "?") {
      count += 1;
    }
  }
  return count;
}
