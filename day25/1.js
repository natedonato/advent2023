const fs = require('fs');
let input = fs.readFileSync("./day25/input.txt", "utf-8").split("\n");

const graph = {};
const edges = {};

for(const line of input){
  let [node, children] = line.split(": ")
  children = children.split(" ");

  if(graph[node] === undefined){
    graph[node] = [];
  }
  
  for(const child of children){
    if(graph[child] === undefined){
      graph[child] = []
    }
    graph[child].push(node);

    graph[node].push(child)
  }

}

console.log(graph);


function bfs(n1, n2){
  console.log("bfs from", n1, "to", n2)
  let queue = [{node: n1, path: n1}];
  let visited = {};

  while(queue.length > 0){
    // console.log("queue", queue)

    let currentNode = queue.pop();    

    if(visited[currentNode.node] === true){
      continue;
    }else{
      visited[currentNode.node] = true;
    }

    if(currentNode.node === n2){
      serializeEdges(currentNode.path);
      return currentNode.path;
    };

    let children = graph[currentNode.node];
    // console.log(children)
    
    if(children !== undefined){  
      for(const child of children){
        const next = {node: child, path: currentNode.path + "," + child}
        queue.unshift(next);
      }
    }

  }
}

function serializeEdges(path){
  // console.log("path", path)
  path = path.split(",");

  for(let i = 0; i < path.length - 1; i++){
    let n1 = path[i]
    let n2 = path[i + 1]
    let edge = [n1,n2].sort().join(",");


    if(edges[edge] === undefined){
      edges[edge] = 0
    }
    edges[edge] += 1;
  }
}

let keys = Object.keys(graph);

function randomNode(){
  let node = keys[Math.floor(Math.random() * keys.length)]
  return node;
}

for(let i = 0; i < 800; i++){
  bfs(randomNode(), randomNode())
  // console.log(edges)
}

let edgeSets = Object.keys(edges).sort((a,b) => edges[b] - edges[a]);

console.log(edgeSets)

//'hhx,vrx', 'grh,nvh', 'jzj,vkb'

let cuts = edgeSets.slice(0,3)
console.log(cuts)
let totalLength = size(cuts[0].split(",")[0])


console.log("original size", totalLength)

for(const cut of cuts){
  let [start, end] = cut.split(",");
  console.log(start,end)

  graph[start] = graph[start].filter(el => el !== end);
  graph[end] = graph[end].filter(el => el !== start)
}

let cutLength = size(cuts[0].split(",")[0]);

console.log("new size", cutLength);


console.log("total", cutLength * (totalLength - cutLength));






function size(n1) {
  console.log(n1)
  let queue = [{ node: n1}];
  let visited = {};

  while (queue.length > 0) {
    let currentNode = queue.pop();

    if (visited[currentNode.node] === true) {
      continue;
    } else {
      visited[currentNode.node] = true;
    }

    let children = graph[currentNode.node];
    // console.log(children)

    if (children !== undefined) {
      for (const child of children) {
        const next = { node: child };
        queue.unshift(next);
      }
    }
  }

  return Object.keys(visited).length;
}