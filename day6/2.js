const fs = require("fs");
let input = fs.readFileSync("day6/input.txt", "utf-8");

// let input = `Time:      71530
// Distance:  940200`;

input = input.split("\n").map((el) => el.split(":")[1]);
input = input.map((el) =>
  el
    .split(" ")
    .filter((el) => el !== "").join("")
).map(el => parseInt(el));

let time = input[0];
let dist = input[1];
console.log("time and distance: ");
console.log(time, dist);
let count = 0;

let currentSpeed = 0;
for (let i = 0; i <= time; i++) {
  // console.log("button held", currentSpeed)
  // console.log("total dist", currentSpeed * (time - currentSpeed))

  // console.log("\n")
  if (currentSpeed * (time - currentSpeed) > dist) {
    count += 1;
  }
  currentSpeed += 1;
}

console.log("count:");
console.log(count);