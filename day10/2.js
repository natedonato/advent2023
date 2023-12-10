const fs = require("fs");
let input = fs
  .readFileSync("day10/input.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(""));

// widen out array

let i = 1;
while(i < input.length){
  input.splice(i,0,new Array(input[0].length).fill(" "))
  i += 2;
}
let j = 1
while(j < input[0].length){
  for(const row of input){
    row.splice(j,0," ")
  }
  j += 2;
}


prettyPrint("input2");


const directions = {
  "|": [
    [1, 0],
    [-1, 0],
  ],
  "-": [
    [0, 1],
    [0, -1],
  ],
  L: [
    [-1, 0],
    [0, 1],
  ],
  J: [
    [-1, 0],
    [0, -1],
  ],
  7: [
    [0, -1],
    [1, 0],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
};


const pipes = {
  "1,0": "|",
  "-1,0": "|",
  "0,1": "-",
  "0,-1": "-",
};

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

// find S
// console.log(input);

let point = { dist: 0 };

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "S") {
      point.coord = [i, j];

      // sample: S = F
      // input: S = L;
      input[i][j] = "L";
    }
  }
}

let queue = [];
let visited = {};
queue.push(point);

while (queue.length > 0) {
  let current = queue.shift();
  let dist = current.dist;
  let coord = current.coord;
  visited[current.coord.join(",")] = dist;

  let symbol = input[coord[0]][coord[1]];
  input[coord[0]][coord[1]] = "X";

  let nextPoints = directions[symbol];
  if (symbol === "X") {
    continue;
  }
  nextPoints = nextPoints.map((el) => [el[0] + coord[0], el[1] + coord[1], el]);

  for (const point of nextPoints) {

    if (input[point[0]][point[1]] === " ") {
      input[point[0]][point[1]] = pipes[point[2].join(",")];
    }
    if (visited[point.slice(0,2).join(",")] === undefined) {
      queue.push({ coord: point, dist: dist + 1 });
    }
  }
}


for(let i = 0; i < input.length; i++){
  for(let j = 0; j < input[0].length; j++){
    if(input[i][j] !== "X"){
      input[i][j] = " ";
    }
  }
}

// flood fill from top left

let s = [0,0];
queue = [s];

function getNeighbors(i,j){
  points = [
    [i-1,j],
    [i+1,j],
    [i,j-1],
    [i,j+1],
  ]

  points = points.filter(el => el[0] >= 0 && el[0] < input.length && el[1] >= 0 && el[1] < input[0].length);
  return points;
}

while(queue.length > 0){
  let current = queue.shift();
  let [i,j] = current
  let currentSymbol = input[i][j]
  if(currentSymbol !== " "){
    continue
  };
  input[i][j] = 0;

  let neighbors = getNeighbors(i,j)
  neighbors = neighbors.filter(el => input[el[0]][el[1]] === " ")
  queue.push(...neighbors);
}

i = 1;
while (i < input.length) {
  input.splice(i, 1);
  i += 1;
}
j = 1;
while (j < input[0].length) {
  for (const row of input) {
    row.splice(j, 1);
  }
  j += 1;
}

let count = 0;
for(let i = 0; i < input.length; i++){
  for(let j = 0; j < input[0].length; j++){
    if(input[i][j] === " "){
      count += 1;
    }
  }
}

console.log(count)

function prettyPrint(name){
  // pretty print and save result
  let text = ""
  for(const line of input){
    text += line.join("") 
    text += "\n";
  }
  fs.writeFileSync(`./day10/${name}.txt`, text)
};


prettyPrint("output");
