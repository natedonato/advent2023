const fs = require("fs");
let input = fs.readFileSync("./day21/input.txt", "utf-8").split("\n");

console.log(input)

let start = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "S") {
      start = [i, j];
    }
  }
}

console.log(start)


let queue = [start]

for(let i = 0; i < 64; i++){
  let next = [];
  const current = {};
  for(const point of queue){
    let nextPoints = getNext(point);
    for(const point of nextPoints){
      if(current[point.join(",")] === undefined){
        current[point.join(",")] = true;
        next.push(point)
      }
    }
  }
  queue = next;

  prettyPrint(queue)
}

console.log(queue.length)

function inBounds(point){
  const [x, y] = point;
  return (x >= 0 && y >= 0 && x < input.length && y < input[0].length);
}

function getNext(point){
  const [x, y] = point
  const nextPoints = [
      [x+1,y],
      [x-1,y],
      [x,y+1],
      [x,y-1]
  ].filter(el => inBounds(el)).filter(el => input[el[0]][el[1]] !== "#")
  return nextPoints
}


function prettyPrint(queue){
  let copy = [...input].map(el => el.split(""));

  console.log("");
  
  for(const point of queue){
    console.log(point)
    copy[point[0]][point[1]] = "O"
  }
  
  for(const line of copy){
    console.log(line.join(""));
  }
  
  console.log("");
}