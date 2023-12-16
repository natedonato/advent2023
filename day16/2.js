const fs = require("fs");

let input = fs
  .readFileSync("./day16/input.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(""));

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

let max = 0;

function test(dir, loc) {
  const energized = {};
  const visited = {};
  // beam: {direction: [r,c], location: [r,c]}
  let beams = [{ direction: dir, location: loc }];

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
      beams.unshift({
        direction: [...nextBeam.direction],
        location: nextCoord,
      });
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

  let total = Object.keys(energized).length;
  // console.log(Object.keys(energized).length);

  max = Math.max(total, max);
}

// test all top and bottom edges
for (let i = 0; i < input.length; i++) {
  test([1, 0], [0, i]);
  test([-1, 0], [input.length - 1, i]);
}

// test all left and right edges
for (let i = 0; i < input[0].length; i++) {
  test([0, 1], [i, 0]);
  test([0, -1], [i, input[0].length - 1]);
}

console.log("best possible:", max);

// helper to test if coordinates are out of bounds
function isOob(r, c) {
  if (r < 0 || c < 0 || r >= input.length || c >= input[0].length) {
    return true;
  }
  return false;
}