const fs = require("fs");
let input = fs.readFileSync("./day22/input.txt", "utf-8").split("\n")

let bricks = [];
for(const [idx, line] of input.entries()){
  let [start, end] = line.split("~");

  start = start.split(",").map(el => parseInt(el))
  end = end.split(",").map(el => parseInt(el))

  let brick = [[start[0],end[0]], [start[1],end[1]],[start[2],end[2]]]
  // brick = brick.map(el => el.sort((a,b) => a-b))
  bricks.push({dimensions: brick, falling: true, restingOnTop: [], key: idx });
}

bricks = bricks.sort((a,b) => a.dimensions[2][0] - b.dimensions[2][0]);

function fall(brick){
  while(brick.falling){
    let currentHeight = brick.dimensions[2][0]

    // brick hit the ground
    if(currentHeight === 1){
      brick.falling = false;
      return;
    }

    // brick hit another brick

    let underneath = bricksUnder(brick);
    if(underneath.length > 0){
      for(const b of underneath){
        brick.restingOnTop.push(b)
      }
      brick.falling = false;
      return;
    }

    // brick falls down one
    brick.dimensions[2] = brick.dimensions[2].map(el => el - 1);
  }
}

function bricksUnder(brick){
  let brickHeight = brick.dimensions[2][0];
  
  let potentialsBeneath = bricks.filter(el => el.dimensions[2][1] === brickHeight -1);
  potentialsBeneath = potentialsBeneath.filter(el => xyOverlap(brick, el));

  return potentialsBeneath;
}

function xyOverlap(brickA, brickB){
  let x1 = brickA.dimensions[0]
  let x2 = brickB.dimensions[0]
  let y1 = brickA.dimensions[1]
  let y2 = brickB.dimensions[1]
  if(rangeOverlap(x1,x2) && rangeOverlap(y1,y2)){
    return true;
  }
  return false;
}

function rangeOverlap(r1, r2){
  if(r1[0] > r2[0]){
    [r1,r2] = [r2,r1]
  };

  if(r2[0] <= r1[1]){
    return true
  }else{
    return false
  }
}

console.table(bricks.map(el => [el.key, ...el.dimensions, el.falling, el.restingOnTop]))


for(const brick of bricks){
  fall(brick)
}

//inspect

console.table(bricks.map(el => [el.key, ...el.dimensions, el.falling, el.restingOnTop]))


for(const brick of bricks){
  if(brick.restingOnTop.length === 1){
    brick.restingOnTop[0].required = true;
  }
}

console.log(bricks.filter(el => el.required !== true).length)