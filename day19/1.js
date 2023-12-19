const fs = require("fs");
let input = fs.readFileSync("./day19/input.txt", "utf-8")

// x: Extremely cool looking
// m: Musical (it makes a noise when you hit it)
// a: Aerodynamic
// s: Shiny

// R: rejected
// A: accepted

// Consider the workflow ex{x>10:one,m<20:two,a>30:R,A}. This workflow is named ex and contains four rules. If workflow ex were considering a specific part, it would perform the following steps in order:

// Rule "x>10:one": If the part's x is more than 10, send the part to the workflow named one.
// Rule "m<20:two": Otherwise, if the part's m is less than 20, send the part to the workflow named two.
// Rule "a>30:R": Otherwise, if the part's a is more than 30, the part is immediately rejected (R).
// Rule "A": Otherwise, because no other rules matched the part, the part is immediately accepted (A).

let [ruleStrings, parts] = input.split("\n\n");

// make parts
parts = parts.split("\n").map(el => el.slice(1, el.length - 1))
parts = parts.map(el => el.split(","))
for(let i = 0; i < parts.length; i++){
  let a = parts[i]
  const obj = {}
  for(const attr of a){
    const [key, val] = attr.split("=")
    obj[key] = parseInt(val)
  }
  parts[i] = obj
}

// parts: [{x: int, m: int, a: int, s: int}, ...]
console.log("parts", parts)

// process rules 
const rules = {};
for(const str of ruleStrings.split("\n")){
  let [key, rest] = str.split("{");
  rules[key] = rest.slice(0,-1)
}

console.log("rules", rules)

const accepted = [];
const rejected = [];

for(const part of parts){
  interpretRule("in", part);
}

function interpretRule(ruleKey, part){
  console.log("\n")

  console.log("part", part)
  console.log("rule", ruleKey)

  if(ruleKey === "A"){
    accepted.push(part)
    return;
  }else if(ruleKey === "R"){
    rejected.push(part)
    return;
  }

  // get rule
  let ruleStr = rules[ruleKey]
  ruleStr = ruleStr.split(",");

  for(let i = 0; i < ruleStr.length; i++){
    let rule = ruleStr[i];
    console.log(rule)

    if(rule.indexOf(">") !== -1){
      const [category,rest] = rule.split(">")
      const [val, goto] = rest.split(":")
      if(part[category] > parseInt(val)){
        interpretRule(goto, part)
        return;
      }else{
       continue; 
      }
    }else if(rule.indexOf("<") !== -1){
      console.log("less than")
      const [category,rest] = rule.split("<")
      const [val, goto] = rest.split(":")
      console.log("categor", category, "val", parseInt(val),"goto", goto)
      console.log(part[category])

      if(part[category] < parseInt(val)){
        console.log("was less than")
        interpretRule(goto, part)
        return;
      }else{
       continue; 
      }
    }else{
      interpretRule(rule, part);
      return;
    }
  }
}

console.log(accepted)
console.log(rejected)

let sum = 0;
for(const item of accepted){
  sum += item.a + item.x + item.m + item.s

}

console.log("total sum", sum)