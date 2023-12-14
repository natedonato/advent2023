const fs = require("fs");
let input = fs.readFileSync("./day13/input.txt", "utf-8").split("\n\n").map(el => el.split("\n"));

function checkReflection(map, reflectionPoint, vertical){
  if((!vertical && reflectionPoint >= map.length - 1) || (vertical && reflectionPoint >= map[0].length - 1)){
    return false
  }
  reflectionPoint += 1;
  let rowsToCheck = Math.min(reflectionPoint , map.length - reflectionPoint)
  if(vertical){rowsToCheck = Math.min(reflectionPoint , map[0].length - reflectionPoint)}
  reflectionPoint -= 1;

  if (
    rowsToCheck <= 0
  ){

    return false;
  }

  for(let i = 0; i < rowsToCheck; i ++){
    let first = map[reflectionPoint - i]
    let second = map[reflectionPoint + 1 + i]
    if (vertical) {
      first = map.map((el) => el.charAt(reflectionPoint - i)).join("");
      second = map.map((el) => el.charAt(reflectionPoint + 1 + i)).join("");
    }

    if(first !== second){
      return false
    }
  }

  return true;
}


let sum = 0;

for(const map of input){
  for(let i = 0; i < Math.max(map.length - 1, map[0].length - 1); i++){
    if(checkReflection(map, i) === true){
      sum += (i+1) * 100
      break
    }else if(checkReflection(map, i , true)){
      sum += i + 1;
      break
    }
  }
}

console.log("sum", sum)