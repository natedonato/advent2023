const fs = require("fs");
let input = fs.readFileSync("day6/input.txt", "utf-8");

// let input = `Time:      7  15   30
// Distance:  9  40  200`;

input = input.split("\n").map((el) => el.split(":")[1]);
input = input.map((el) =>
  el
    .split(" ")
    .filter((el) => el !== "")
    .map((el) => parseInt(el))
);

let total = 1;

for (let i = 0; i < input[0].length; i++) {
  let time = input[0][i];
  let dist = input[1][i];
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

  console.log(count);

  total *= count;
}

console.log("total", total);
