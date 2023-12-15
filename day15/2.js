const fs = require("fs");
let input = fs.readFileSync("./day15/input.txt", "utf-8");

input = input.split(",");

let boxes = new Array(256).fill(0).map(el => new Array());

for (const item of input) {
  let val = 0;
  let label;
  let focal_length;
  let op;
  if(item.indexOf("=") !== -1){
    op = "equals"
    label = item.split('=')[0]
    focal_length = item.split('=')[1]
  }else{
    op = "dash"
    label = item.slice(0, item.length - 1)
  }

  for (let i = 0; i < label.length; i++) {
    let code = label.charCodeAt(i);
    val += code;
    val *= 17;
    val %= 256;
  }

  let target_box = val;
  
  if(op === "equals"){
    let idx = boxes[target_box].findIndex(el => el.label === label)
    if(idx === -1){
      // if not already in, add to end of box
      boxes[target_box].push({label, focal_length})
    }else{
      // if already has same label, replace
      boxes[target_box].splice(idx,1,{label, focal_length})
    }

  }else if (op === "dash"){
    // find any matching label in target box with label & remove them
    boxes[target_box] = boxes[target_box].filter(el => el.label !== label)
  }
}

let total_power = 0;
for(const [number, box] of boxes.entries()){
  for(const [slot, item] of box.entries()){
    let power = (number+1) * (slot + 1) * item.focal_length
    // console.log(power)
    total_power += power
  }
}

console.log("total power", total_power)