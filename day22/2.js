const fs = require("fs");
let input = fs.readFileSync("./day22/input.txt", "utf-8").split("\n");

let bricks = [];
for (const [idx, line] of input.entries()) {
  let [start, end] = line.split("~");

  start = start.split(",").map((el) => parseInt(el));
  end = end.split(",").map((el) => parseInt(el));

  let brick = [
    [start[0], end[0]],
    [start[1], end[1]],
    [start[2], end[2]],
  ];
  // brick = brick.map(el => el.sort((a,b) => a-b))
  bricks.push({ dimensions: brick, restingOnTop: [], key: idx });
}

bricks = bricks.sort((a, b) => a.dimensions[2][0] - b.dimensions[2][0]);

function fall(brick) {
  let falling = true
  while (falling) {
    let currentHeight = brick.dimensions[2][0];

    // brick hit the ground
    if (currentHeight === 1) {
      falling = false;
      return;
    }

    // brick hit another brick

    let underneath = bricksUnder(brick);
    if (underneath.length > 0) {
      for (const b of underneath) {
        brick.restingOnTop.push(b);
      }
      falling = false;
      return;
    }

    // brick falls down one
    brick.dimensions[2] = brick.dimensions[2].map((el) => el - 1);

  }
}

function bricksUnder(brick) {
  let brickHeight = brick.dimensions[2][0];

  let potentialsBeneath = bricks.filter(
    (el) => el.dimensions[2][1] === brickHeight - 1
  );
  potentialsBeneath = potentialsBeneath.filter((el) => xyOverlap(brick, el));

  return potentialsBeneath;
}

function xyOverlap(brickA, brickB) {
  let x1 = brickA.dimensions[0];
  let x2 = brickB.dimensions[0];
  let y1 = brickA.dimensions[1];
  let y2 = brickB.dimensions[1];
  if (rangeOverlap(x1, x2) && rangeOverlap(y1, y2)) {
    return true;
  }
  return false;
}

function rangeOverlap(r1, r2) {
  if (r1[0] > r2[0]) {
    [r1, r2] = [r2, r1];
  }

  if (r2[0] <= r1[1]) {
    return true;
  } else {
    return false;
  }
}

console.table(
  bricks.map((el) => [el.key, ...el.dimensions, el.falling, el.restingOnTop])
);

for (const brick of bricks) {
  fall(brick);
}

//inspect


for (const brick of bricks) {
  if (brick.restingOnTop.length === 1) {
    brick.restingOnTop[0].required = true;
  }
}

bricks = bricks.sort((a, b) => a.dimensions[2][0] - b.dimensions[2][0]);


console.table(bricks.map((el) => [el.key, ...el.dimensions, el.restingOnTop]));

// test bricks
// serialize bricks
// for i < bricks.length
// deserialize bricks
// remove brick I
// fall bricks
// count num fell

let serial = JSON.stringify(bricks);
let total = 0;
for(let i = 0; i < bricks.length; i++){
  let currentBricks = JSON.parse(serial);

  currentBricks[i].dimensions[2] = currentBricks[i].dimensions[2].map(el => el - 1000000);
  // console.log(currentBricks)

  let count = 0;
  for(const brick of currentBricks){
    if (fall2(brick, currentBricks) === true) {
      count += 1;
    }
  }
  total += count
  console.log(count)
}

console.log("total sum", total)



function fall2(brick, currentBricks) {
  let fell = false;
  while (true) {
    let currentHeight = brick.dimensions[2][0];

    // brick hit the ground
    if (currentHeight <= 1) {
      return fell;
    }

    // brick hit another brick

    let underneath = bricksUnder2(brick, currentBricks);
    if (underneath.length > 0) {
      return fell;
    }

    // brick falls down one
    brick.dimensions[2] = brick.dimensions[2].map((el) => el - 1);
    fell = true;
  }
}


function bricksUnder2(brick, bricks) {
  let brickHeight = brick.dimensions[2][0];

  let potentialsBeneath = bricks.filter(
    (el) => el.dimensions[2][1] === brickHeight - 1
  );
  potentialsBeneath = potentialsBeneath.filter((el) => xyOverlap(brick, el));

  return potentialsBeneath;
}