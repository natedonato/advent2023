const fs = require("fs");
let input = fs
  .readFileSync("./day11/input.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(""));

let i = 0;

let expansionVal = 1000000;
expansionVal -= 1;
let expansionRows = [];
let expansionCols = [];

while (i < input.length) {
  if (input[i].every((el) => el === ".")) {
    expansionRows.push(i)
  }
  i += 1; 
}

let j = 0;

while (j < input[0].length) {
  let col = input.map((el) => el[j]);

  if (col.every((el) => el === ".")) {
   expansionCols.push(j)
  }
  j += 1;
}

let galaxies = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "#") {
      galaxies.push([i, j]);
    }
  }
}


for(let i = 0; i < galaxies.length; i++){
  let g = galaxies[i];
  let x = expansionRows.filter(el => el < g[0]).length;
  let y = expansionCols.filter(el => el < g[1]).length;



  galaxies[i] = [g[0] + (x * expansionVal), g[1] + (y*expansionVal)]
}

// console.log(galaxies)

let sum = 0;

for (const [index, galaxy] of galaxies.entries()) {
  for (const [index2, galaxy2] of galaxies.entries()) {
    if (index < index2) {
      let dist = calcDist(galaxy, galaxy2);
      sum += dist;
    }
  }
}

console.log(sum);

function calcDist(galaxy, galaxy2) {
  let dist =
    Math.abs(galaxy2[0] - galaxy[0]) + Math.abs(galaxy2[1] - galaxy[1]);
  return dist;
}
