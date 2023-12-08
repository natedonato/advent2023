const fs = require("fs");
let input = fs.readFileSync("day8/input.txt", "utf-8").split("\n");
// let input = fs.readFileSync("day8/sample.txt", "utf-8").split("\n");

const directions = input.shift();
input.shift();

const graph = {};

for (const line of input) {
  let key = line.slice(0, 3);
  let left = line.slice(7, 10);
  let right = line.slice(12, 15);
  graph[key] = { key, left, right };
}

let i = 0;
let currentNodes = Object.keys(graph).filter((el) => el.charAt(2) === "A");
console.log(currentNodes);

currentNodes 

let searching = true;
let seen = new Array(currentNodes.length).fill(0).map(el => new Array());


while (searching) {
  let direction = directions.charAt(i % directions.length);
  if (direction === "L") {
    for (let i = 0; i < currentNodes.length; i++) {
      currentNodes[i] = graph[currentNodes[i]].left;
    }
  } else if (direction === "R") {
    for (let i = 0; i < currentNodes.length; i++) {
      currentNodes[i] = graph[currentNodes[i]].right;
    }
  } else {
    throw new Error("bad direction");
  }
  i += 1;

  for(const [idx, item] of currentNodes.entries()){
    if(item.charAt(2) === "Z"){
      seen[idx].push(i);
    }
  }


  if (
    seen.filter(el => el.length >= 4).length === seen.length
  ) {
    searching = false;
  }
}

console.log("seen Z's", seen);

let starts = seen.map (el => el[0])


// // need to find the LCM of all the starts
// // naive linear lcm:
// let first = starts.shift();
// let lcming = true;
// let j = 1;
// while(lcming){
//   const candidate = first * j;
//   if(j%100 === 0){
//     console.log(candidate);
//   }
//   if(starts.every(el => candidate % el === 0)){
//     lcming = false;
//     console.log("final", candidate);
//   }
//   j += 1;
// }
// 
// // final answer for my input: 14616363770447


// LCM improved with internet research:
// lcm = least common multiple
// gcd = least common denominator

// info: lcm(a,b,c) === lcm(a, lcm(b,c))
// info: lcm(a,b) = (a * b) / gcd(a,b)
//
// gcd wikipedia pseudocode
// function gcd(a, b)
//     while b ≠ 0
//         t := b
//         b := a mod b
//         a := t
//     return a

// const lcm = (a, b) => a * b / gcd(a, b);

// let ans = starts.reduce(lcm); 

// console.log(ans) 

function gcd(a,b){
  while(b !== 0){
    const temp = b;
    b = a % b,
    a = temp
  }
  return a;
}

function lcm(a,b){
  return (a * b) / gcd(a,b)
}

let least_common = 1;
for(const item of starts){
  least_common = lcm(least_common, item)
}

console.log(least_common)