const fs = require("fs");
let input = fs.readFileSync("./day15/input.txt", "utf-8");

input = input.split(",")

console.log(input)
let sum = 0;
for(const item of input){
  let val = 0;
  for(let i = 0; i < item.length; i++){
    let code = item.charCodeAt(i);
    val += code
    val *= 17;
    val %= 256
  }
  console.log(val)
  sum += val
}

console.log("sum", sum)