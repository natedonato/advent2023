const fs = require("fs");
let input = fs.readFileSync("day4/input.txt", "utf-8").split("\n");

let points = 0;
for(let line of input){
  let [wins, mine] = line.slice(8).split(" | ").map(el => el.split(" ").filter(el => el != ""));
  let score = 0;

  for(const num of wins){
    if(mine.includes(num)){
      if(score === 0){
        score = 1;
      }else{
        score *= 2;
      }
    }
  }

  console.log(score)
  points += score
}

console.log(points)