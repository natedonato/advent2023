const fs = require("fs");
let input = fs.readFileSync("./day23/input.txt", "utf-8").split("\n");

console.log(input);


let start = "0,1";

let stack = [start];

const slopes = {
  ">": [0, 1],
  "<": [0, -1],
  "v": [1, 0],
  "^": [-1, 0],
};

let paths = [];

dfs(stack);

function dfs(stack){
  let currentPoint = stack[stack.length -1];
  let [x,y] = currentPoint.split(",").map(el => parseInt(el))
  if(x === input.length - 1 && y === input[0].length - 2){
    console.log("end found")
    console.log(stack.length - 1);
    paths.push(stack.length - 1);
    return;
  }
  
  let vects = [
    [0,1],
    [0,-1],
    [1,0],
    [-1,0]
  ]

  if(input[x][y] !== "."){
    vects = [slopes[input[x][y]]]
  }

  for(const vect of vects){
    let next = [x+vect[0], y+vect[1]];
    // console.log(next)

    if(
      next[0] >= 0 && 
      next[0] < input.length 
      && next[1] >= 0 && next[1] 
      < input[0].length &&
      input[next[0]][next[1]] !== "#"){
      let point = next.join(",")
      if(!stack.includes(point)){
        stack.push(point);
        dfs(stack)
        stack.pop()
      }
    }
  }
}

console.log("longest path", Math.max(...paths))