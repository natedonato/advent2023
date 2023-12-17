const fs = require("fs");
let input = fs.readFileSync("./day17/input.txt", "utf-8").split("\n");
const { MinPriorityQueue } = require("@datastructures-js/priority-queue");

// can't reverse only turn left or right
// at most 3 steps in one direction

const directions = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

const turns = {
  U: ["L", "R"],
  D: ["L", "R"],
  L: ["U", "D"],
  R: ["U", "D"],
};

function inBounds(point) {
  const r = point[0];
  const c = point[1];
  if (r >= 0 && c >= 0 && r < input.length && c < input[0].length) {
    return true;
  }
  return false;
}

dijk();

// const numbersQueue = new MinPriorityQueue();

function dijk() {
  const queue = new MinPriorityQueue((item) => item.heat);
  let a = { heat: 0, location: [0, 0], direction: "D", momentum: 0 };
  let b = { heat: 0, location: [0, 0], direction: "R", momentum: 0 };

  queue.enqueue(a, b);

  const visited = {};

  while (queue.size() > 0) {
    let currentNode = queue.dequeue();

    const key = `${currentNode.location.join(",")}:${currentNode.direction}`;
    if (visited[key] === undefined) {
      const cache = new Array(12);
      cache[currentNode.momentum] = currentNode.heat;
      visited[key] = cache;
    } else {
      let cache = visited[key];

      if (cache[currentNode.momentum] <= currentNode.heat) {
        continue;
      } else {
        
        cache[currentNode.momentum] = currentNode.heat;
        if(currentNode.momentum > 3){
           for (let i = currentNode.momentum; i < cache.length; i++) {
             cache[i] = currentNode.heat;
           }
        }

        visited[key] = cache;
      }
    }

    if (
      currentNode.location[0] === input.length - 1 &&
      currentNode.location[1] === input[1].length - 1 &&
      currentNode.momentum > 3
    ) {
      console.log(currentNode.heat);
      return currentNode.heat;
    }

    if (currentNode.momentum < 10) {
      let next = move(currentNode, currentNode.direction);
      if (next !== false) {
        queue.enqueue(next);
      }
    }
    if (currentNode.momentum > 3) {
      const nextDirections = turns[currentNode.direction];
      for (const d of nextDirections) {
        let next = move(currentNode, d);
        if (next !== false) {
          queue.enqueue(next);
        }
      }
    }
  }
}

function move(node, direction) {
  vector = directions[direction];
  const newNode = {};
  newNode.location = [
    node.location[0] + vector[0],
    node.location[1] + vector[1],
  ];

  if (!inBounds(newNode.location)) {
    return false;
  }

  newNode.heat =
    node.heat + parseInt(input[newNode.location[0]][newNode.location[1]]);

  newNode.direction = direction;
  if (direction === node.direction) {
    newNode.momentum = node.momentum + 1;
  } else {
    newNode.momentum = 1;
  }

  return newNode;
}
