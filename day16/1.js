const fs = require("fs");

let input = fs
  .readFileSync("./day16/input.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(""));

prettyPrint();

function prettyPrint() {
  console.log("");
  for (const line of input) {
    console.log(line.join(""));
  }
  console.log("");
}

function prettyPrintCoord(x, y) {
  let a = [...input].map((el) => [...el]);
  a[x][y] = "#";
  console.log("");
  for (const line of a) {
    console.log(line.join(""));
  }
  console.log("");
}

const dirMap = {
  "/": {
    "0,1": "-1,0",
    "0,-1": "1,0",
    "-1,0": "0,1",
    "1,0": "0,-1",
  },

  "\\": {
    "0,1": "1,0",
    "0,-1": "-1,0",
    "1,0": "0,1",
    "-1,0": "0,-1",
  },
};

const energized = {};

const visited = {};

// beam: {direction: [r,c], location: [r,c]}
let beams = [{ direction: [0, 1], location: [0, 0] }];

while (beams.length > 0) {
  let nextBeam = beams.shift();

  if (isOob(...nextBeam.location)) {
    continue;
  }

  // prettyPrintCoord(...nextBeam.location);

  energized[nextBeam.location.join(",")] = true;
  let visitedKey = [
    nextBeam.location.join(",") + ";" + nextBeam.direction.join(","),
  ];
  if (visited[visitedKey] === undefined) {
    visited[visitedKey] = true;
  } else {
    continue;
  }

  let tile = input[nextBeam.location[0]][nextBeam.location[1]];

  // if tile empty or tile is a pointy end of splitter, continue in same direction
  if (
    tile === "." ||
    (tile === "-" && nextBeam.direction[0] === 0) ||
    (tile === "|" && nextBeam.direction[1] === 0)
  ) {
    let nextCoord = [
      nextBeam.location[0] + nextBeam.direction[0],
      nextBeam.location[1] + nextBeam.direction[1],
    ];
    beams.unshift({ direction: [...nextBeam.direction], location: nextCoord });
    // if flat side of splitter, split into two
  } else if (tile === "|" || tile === "-") {
    let nextDirectionA = [nextBeam.direction[1], nextBeam.direction[0]];
    let nextDirectionB = [nextDirectionA[0] * -1, nextDirectionA[1] * -1];
    let nextCoordA = [
      nextBeam.location[0] + nextDirectionA[0],
      nextBeam.location[1] + nextDirectionA[1],
    ];
    let nextCoordB = [
      nextBeam.location[0] + nextDirectionB[0],
      nextBeam.location[1] + nextDirectionB[1],
    ];
    beams.unshift({ direction: [...nextDirectionA], location: nextCoordA });
    beams.unshift({ direction: [...nextDirectionB], location: nextCoordB });
    // if tilted mirror, adjust direction and continue in new direction
  } else {
    let nextDir = dirMap[tile][nextBeam.direction.join(",")]
      .split(",")
      .map((el) => parseInt(el));

    let nextCoord = [
      nextBeam.location[0] + nextDir[0],
      nextBeam.location[1] + nextDir[1],
    ];

    beams.unshift({ direction: [...nextDir], location: nextCoord });
  }
}

// test if coordinates are out of bounds
function isOob(r, c) {
  if (r < 0 || c < 0 || r >= input.length || c >= input[0].length) {
    return true;
  }
  return false;
}

for (const coord of Object.keys(energized)) {
  let [x, y] = coord.split(",");
  input[x][y] = "#";
}

prettyPrint();

console.log(Object.keys(energized).length);
