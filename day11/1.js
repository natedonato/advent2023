const fs = require('fs');
let input = fs.readFileSync("./day11/input.txt", "utf-8").split("\n").map(el => el.split(""));

// console.log(input);


let i = 0;

while(i < input.length){
  if(input[i].every(el => el === ".")){
    input.splice(i,0, new Array(input[0].length).fill("."))
    i += 1;
  }
  i += 1;
}

let j = 0;

while(j < input[0].length){
  let col = input.map(el => el[j]);

  if(col.every(el => el === ".")){
    input.forEach(el => el.splice(j, 0, "."));
    j += 1;
  }
  j += 1;
}

let galaxies = [];


for(let i = 0; i < input.length; i++){
  for(let j = 0; j < input[0].length; j++){
    if(input[i][j] === "#"){
      galaxies.push([i,j]);
    }
  }
};

// console.log(galaxies)

let sum = 0;

for(const [index, galaxy] of galaxies.entries()){
  for (const [index2, galaxy2] of galaxies.entries()) {
    if(index < index2){
      let dist = calcDist(galaxy, galaxy2);
      sum += dist;
    }
  }
}

console.log(sum);

function calcDist(galaxy, galaxy2){
  let dist = Math.abs(galaxy2[0] - galaxy[0]) + Math.abs(galaxy2[1] - galaxy[1]);
  return dist
}