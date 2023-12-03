const fs = require("fs");
let input = fs.readFileSync("day3/input.txt", "utf-8").split("\n");
input = input.map(el => el.split(""))

// check if a char is a number
function isNum(x){
  return "1234567890".includes(x)
}

// check if a char is a "symbol"
function isSymbol(x){
  if(x !== "." && !isNum(x)){
    return true;
  }else{
    return false;
  }
}

function isAnySymbol(arr){
  return arr.some(el => isSymbol(el))
}

// get all neighboring characters and return in an array 
// coord [row, column]
function getAdjacents(coord){
  let [r,c] = coord
  const adjacents = [];
  
  for(let i = r - 1; i <= r + 1; i++){
    for(let j = c - 1; j <= c + 1; j++){
      if(i >= 0 && i < input.length && j >= 0 && j < input[0].length){
        adjacents.push(input[i][j])
      }
    }
  }

  return adjacents
}

const numbersInChart = [];

function findNumbers(){
  for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[i].length; j++){
      
      if(isNum(input[i][j])){
        let number = input[i][j];
        let coords = [[i,j]];

        while(isNum(input[i][j+1])){
          number += input[i][j+1]
          coords.push([i,j+1])
          j += 1
        }
        numbersInChart.push({number, coords})

      }
    }
  }
}

findNumbers()

let sum = 0;

for(const item of numbersInChart){
  let {number, coords} = item;

  if(!coords.every(el => !isAnySymbol(getAdjacents(el)))){
    sum += parseInt(number)
  }
}

console.log(sum)