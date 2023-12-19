const fs = require("fs");
let input = fs.readFileSync("./day18/input.txt", "utf-8").split("\n");

const directions = {
  R: [0,1],
  L: [0,-1],
  U: [-1,0],
  D: [1,0],
}

let current = [0, 0];

let visited = {"0,0": true};


for(const line of input){
  let [direction, length, hex] = line.split(" ");
  const vect = directions[direction];
  for(let i = 0; i < length; i++){
    current = [current[0]+vect[0], current[1] + vect[1]];
    visited[current.join(",")] = true
  }
}

let points = Object.keys(visited).map(el => el.split(",").map(el => parseInt(el)))

const minRow = Math.min(...points.map(el => el[0]))
const minCol = Math.min(...points.map(el => el[1]))

const maxRow = Math.max(...points.map(el => el[0]))
const maxCol = Math.max(...points.map(el => el[1]))


points = points.map( el => [el[0] - minRow + 1, el[1] - minCol + 1]);




// flood fill
const fillStart = [-minRow + 1 + 1, -minCol + 1 + 1];
// reset visited
visited = {};
for(const point of points){
  visited[point.join(",")] = true;
}

console.log('visited', visited)

const queue = [fillStart]
console.log(fillStart);

while(queue.length > 0){
  let currentPoint = queue.shift();
  // console.log(currentPoint)

  if(visited[currentPoint.join(",")] === true){
    continue;
  }else{
    visited[currentPoint.join(",")] = true;
    for (const vect of Object.values(directions)) {
      queue.push([currentPoint[0] + vect[0], currentPoint[1] + vect[1]]);
    }
  }
}

console.log(Object.keys(visited).length)



// //visualize
// const map = new Array(maxRow - minRow + 3).fill(0).map(el => new Array(maxCol - minCol + 3).fill("."));
// console.log(map)

// for(const point of points){
//   map[point[0]][point[1]] = "#";
// }

// map[-minRow + 1][-minCol + 1] = "X";
// map[-minRow + 1 + 1][-minCol + 1 + 1] = "O";

// let str = ""
// for(const line of map){
//   str += line.join("") + "\n";
// }

// fs.writeFileSync("./day18/output.txt", str);


