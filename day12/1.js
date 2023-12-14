const fs = require("fs");
let input = fs.readFileSync('./day12/input.txt', "utf-8");
const memo = {};

input = input.split("\n").map(el => el.split(" "));


let sum = 0;

for(const line of input){
  let [springs, key] = line;
  springs = springs.split("");
  let num_possible = 0;

  let unknownVals = countUnknowns(springs);
  let perms = getPerms(unknownVals);

  for(let perm of perms){
    let tempSpring = [...springs];
    
    for(const digit of perm.split("")){
      let nextIdx = tempSpring.indexOf("?")
      let nextChar = (digit === "1" ? "#" : ".")
      tempSpring[nextIdx] = nextChar
    }

    if(makeCount(tempSpring) === key){
      num_possible += 1;
    }
  }

  console.log(num_possible)
  sum += num_possible
}

console.log(sum);

function countUnknowns(springs){
  let count = 0;
  for(let i = 0; i < springs.length; i++){
    if(springs[i] === "?"){count += 1;}
  }
  return count;
}

function makeCount (springs){
  let i = 0;
  let count = [];

  while(i < springs.length){
    let next = springs[i];
    if(next === "#"){
      let j = 1;
      while(springs[ i + j] === "#"){
        j += 1;
      }
      count.push(j);
      i += j
    }
    i += 1;
  }

  return count.join(",");
}





// makes all permutaitons 000-111 of X length, returns array of binary strings
function getPerms(x){
  if(memo[x]){
    return memo[x]
  }
  let permutations = [];

  let final = ""

  for(let i = 0; i < x; i++){
    final += "1"
  }

  let i = 0;
  while(i.toString(2) !== final){
    permutations.push(i.toString(2))
    i += 1;
  }
  
  permutations.push(final);


  permutations = permutations.map(el => {
    while(el.length < x){
      el = "0" + el;
    }
    return el
  })

  memo[x] = permutations;
  return permutations
}