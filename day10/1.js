const fs = require("fs");
let input = fs.readFileSync("day10/input.txt", "utf-8").split("\n").map(el => el.split(""));
// let input = fs.readFileSync("day10/sample.txt", "utf-8").split("\n").map(el => el.split(""));

const directions = {
  "|": [[1,0], [-1,0]],
  "-": [[0,1], [0,-1]],
  "L": [[-1,0],[0,1]],
  "J": [[-1,0],[0,-1]],
  "7": [[0,-1],[1,0]],
  "F": [[0,1],[1,0]],
}

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.


// find S
console.log(input)

let point = {dist: 0};

for(let i = 0; i < input.length; i++){
  for(let j = 0; j < input[0].length; j++){
    if(input[i][j] === "S"){

      point.coord = [i,j];


      // sample: S = F
      // input: S = L;
      input[i][j] = "L"
    }
  }
}


let queue = [];
let visited = {};
queue.push(point)

while(queue.length > 0){
  let current = queue.shift();
  let dist = current.dist;
  let coord = current.coord;
  visited[current.coord.join(",")] = dist;

  let symbol = input[coord[0]][coord[1]];
  input[coord[0]][coord[1]] = dist;

  let nextPoints = directions[symbol];

  console.log(symbol)
  if(typeof(symbol) === "number"){
    console.log("symbol")
    continue
  }
  nextPoints = nextPoints.map(el => [el[0] + coord[0], el[1] + coord[1]]);
  console.log(nextPoints)

  for(const point of nextPoints){
    if(visited[point.join(",")] === undefined){
      queue.push({coord: point, dist: dist+1})
    }

  }

}

console.log(input)
console.log(visited)

