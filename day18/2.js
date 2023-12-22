const fs = require("fs");
let input = fs.readFileSync("./day18/input.txt", "utf-8").split("\n");

// 0 means R, 1 means D, 2 means L, and 3 means U.
const directionsHex = {
  0: "R",
  2: "L",
  3: "U",
  1: "D",
};

const directions = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};

let current = [0, 0];
let perimeter = 0;
let area = 0

for (const line of input) {
  let [direction, length, hex] = line.split(" ");
  hex = hex.slice(2, -1)
  // console.log(hex)

  length = parseInt(hex.slice(0,5), 16)
  direction = directionsHex[parseInt(hex.slice(5), 16)]
  console.log(direction, length)
  const vect = directions[direction];

  let next = [current[0] + (vect[0] * length),
  current[1] + (vect[1] * length)]

  area += (current[0] * next[1]) - (next[0] * current[1])

  perimeter += length 

  current = next;
}

area = area/-2
console.log("permeter length", perimeter);
console.log("area", area)

const ans = area + perimeter/2 + 1
console.log('ans', ans)