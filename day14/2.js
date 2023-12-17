const fs = require("fs");
let input = fs
  .readFileSync("./day14/input.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(""));

function cycle() {
  executeNorth()
  executeWest()
  executeSouth()
  executeEast()
}



function executeNorth() {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === "O") {
        slideNorth(i, j);
      }
    }
  }
}



function executeSouth() {
  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === "O") {
        slideSouth(i, j);
      }
    }
  }
}



function executeWest() {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === "O") {
        slideWest(i, j);
      }
    }
  }
}



function executeEast() {
  for (let i = 0; i < input.length; i++) {
    for (let j = input[0].length - 1; j >= 0; j--) {
      if (input[i][j] === "O") {
        slideEast(i, j);
      }
    }
  }
}



function slideNorth(x, y) {
  let nextX = x;
  nextX -= 1;
  while (nextX >= 0 && input[nextX][y] === ".") {
    input[nextX][y] = input[x][y];
    input[x][y] = ".";
    x = nextX;
    nextX -= 1;
  }
}



function slideWest(x, y) {
  let nextY = y;
  nextY -= 1;
  while (nextY >= 0 && input[x][nextY] === ".") {
    input[x][nextY] = input[x][y];
    input[x][y] = ".";
    y = nextY;
    nextY -= 1;
  }
}




function slideEast(x, y) {
  let nextY = y;
  nextY += 1;
  while (nextY < input[0].length && input[x][nextY] === ".") {
    input[x][nextY] = input[x][y];
    input[x][y] = ".";
    y = nextY;
    nextY += 1;
  }
}




function slideSouth(x, y) {
  let nextX = x;
  nextX += 1;
  while (nextX < input.length && input[nextX][y] === ".") {
    input[nextX][y] = input[x][y];
    input[x][y] = ".";
    x = nextX;
    nextX += 1;
  }
}

function prettyPrint() {
  for (const line of input) {
    console.log(line.join(""));
  }
  console.log("");
}

let loads = []
function calcLoad() {
  let load = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] === "O") {
        load += input.length - i;
      }
    }
  }
  console.log(load)
}

prettyPrint();
console.log("")
console.log("")

const seen = {};

for(let i = 0; i < 1000000000; i++){
  cycle();
  let serial = input.map((el) => el.join("")).join(",");
  if(seen[serial] === undefined){
    seen[serial] = []
  }
  seen[serial].push(i);
  if(seen[serial].length > 5){
    let x = seen[serial];
    let length = x[x.length - 1] - x[x.length - 2]
    // accelerate using period of loop
    while(i < 1000000000 - length){
      i += length
    }

  }
}


calcLoad()

prettyPrint();