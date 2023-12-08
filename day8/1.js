const fs = require("fs");
let input = fs.readFileSync("day8/input.txt", "utf-8").split("\n");
// let input = fs.readFileSync("day8/sample.txt", "utf-8").split("\n");

const directions = input.shift();
input.shift();

const graph = {};

for(const line of input){
  console.log(line)

  let key = line.slice(0,3);
  let left = line.slice(7,10)
  let right = line.slice(12,15)
  graph[key] = {key, left, right};
}

let i = 0;
let currentNode = "AAA"
while(currentNode !== "ZZZ"){
  console.log(currentNode)
  let direction = directions.charAt(i % directions.length);
  if(direction === "L"){
    currentNode = graph[currentNode].left
  }else if(direction === "R"){
    currentNode = graph[currentNode].right;
  }else{
    throw new Error("bad direction")
  }
    i += 1;
}

console.log(i, currentNode);