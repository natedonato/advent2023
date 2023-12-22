//Modules communicate using pulses. Each pulse is either a high pulse or a low pulse. 
//When a module sends a pulse, it sends that type of pulse to each module in its list 
//of destination modules.

//Flip-flop modules (prefix %) are either on or off; they are initially off. If a 
//flip-flop module receives a high pulse, it is ignored and nothing happens. However, 
//if a flip-flop module receives a low pulse, it flips between on and off. If it was off,
// it turns on and sends a high pulse. If it was on, it turns off and sends a low pulse.

//Conjunction modules (prefix &) remember the type of the most recent pulse received from 
//each of their connected input modules; they initially default to remembering a low pulse 
//for each input. When a pulse is received, the conjunction module first updates its memory 
//for that input. Then, if it remembers high pulses for all inputs, it sends a low pulse; 
//otherwise, it sends a high pulse.

//There is a single broadcast module (named broadcaster). When it receives a pulse, it sends 
//the same pulse to all of its destination modules.

//When you push the button, a single low pulse is sent directly to the broadcaster module.
const fs = require("fs")
let input = fs.readFileSync("./day20/input.txt", "utf-8").split("\n");

const graph = {}

// create graph

for(const line of input){
  let [node, children] = line.split(" -> ");
  let type = node.slice(0,1);
  let state;
  if(type === "%"){
    // off
    state = {on: false};
    node = node.slice(1)
  }else if(type === "&"){
    state = {};
    node = node.slice(1)
  }else{
    if(node === "broadcaster"){
      type = "broadcaster";
    }else{
      if(node === "output"){
        type = "output"
      }
    }
  }

  graph[node] = { type, children: children.split(", "), state }

}

graph["output"] = { type: "output", children: [] };

for(const [key,val] of Object.entries(graph)){
  console.log(key, val)
  val.children.forEach(child => {
    if(!graph[child]){
      graph[child] = { type: "output", children: [] };
    }
    if(graph[child].type === "&"){
      graph[child].state[key] = "LOW"
    }
  })
}

console.log(graph)

console.log("\n")


let totalPulses = [0, 0]

let queue = [];



for(let i = 0; i < 1000; i++){
  
  let pulses = [0, 0]
  // begin cycle
  queue.push(["broadcaster", "LOW", "button"]);
  
  while(queue.length > 0){
    sendPulse(...queue.shift())
  }
  
  console.log(pulses)
  console.log("")
  totalPulses[0] += pulses[0]
  totalPulses[1] += pulses[1]



function sendPulse(key, pulse, sender) {
  console.log(sender, pulse, key);

  if (pulse === "LOW") {
    pulses[0] += 1;
  } else if (pulse === "HIGH") {
    pulses[1] += 1;
  }

  let node = graph[key];

  if (node.type === "broadcaster") {
    for (const child of node.children) {
      queue.push([child, pulse, key]);
    }
  } else if (node.type === "%") {
    if (pulse === "HIGH") {
      return;
    } else {
      node.state.on = !node.state.on;
      if (node.state.on) {
        for (const child of node.children) {
          queue.push([child, "HIGH", key]);
        }
      } else {
        for (const child of node.children) {
          queue.push([child, "LOW", key]);
        }
      }
    }
  } else if (node.type === "&") {
    node.state[sender] = pulse;
    if (Object.values(node.state).every((el) => el === "HIGH")) {
      for (const child of node.children) {
        queue.push([child, "LOW", key]);
      }
    } else {
      for (const child of node.children) {
        queue.push([child, "HIGH", key]);
      }
    }
  } else if (node.type === "output") {
    return;
  }
}


}

console.log(totalPulses)
console.log("answer:", totalPulses[0] * totalPulses[1])
