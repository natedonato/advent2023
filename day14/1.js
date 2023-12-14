const fs = require("fs");
let input = fs.readFileSync("./day14/input.txt", "utf-8").split("\n").map(el => el.split(""));

function slideUp(x,y){
  let nextX = x;
  nextX -= 1;
  while(nextX >= 0 && input[nextX][y] === "."){
    input[nextX][y] = input[x][y];
    input[x][y] = "."
    x = nextX
    nextX -= 1
  }
}

function prettyPrint(){
  for(const line of input){
    console.log(line.join(""));
  }
  console.log("")
}

for(let i = 0; i < input.length; i++){
  for(let j = 0; j < input[0].length; j++){
    if(input[i][j] === "O"){
      slideUp(i,j)
    }
  }
}

calcLoad()

function calcLoad(){
  let load = 0;
  for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[0].length; j++){
      if(input[i][j] === "O"){
        load += input.length - i;
      }
    }
  }
  console.log(load)
}


prettyPrint();
