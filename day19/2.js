const fs = require("fs");
let input = fs.readFileSync("./day19/input.txt", "utf-8");

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

startingPart = {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000],
};
// if x > 10 : q
//
//  new part with x[11,4000] goes to q
//  new part with x[1,10] continues on
//
// if x > 11 : j
//   newpart with x[11,10] => doesn't go to j
//   new part with x[1,10] => doesn't increase to 11, continues on
// if x < 4 : p
//   newpart with x[1,3] => p
//   newpart with x[4,10] => continues on
//  accepted: goes to accepted
// rejected: ends

parts = [startingPart];

// process rules
const rules = {};
for (const str of ruleStrings.split("\n")) {
  let [key, rest] = str.split("{");
  rules[key] = rest.slice(0, -1);
}

console.log("rules", rules);

const accepted = [];
const rejected = [];

for (const part of parts) {
  interpretRule("in", part);
}

function interpretRule(ruleKey, part) {
  console.log("\n");

  console.log("part", part);
  console.log("rule", ruleKey);

  if (ruleKey === "A") {
    accepted.push(part);
    return;
  } else if (ruleKey === "R") {
    rejected.push(part);
    return;
  }

  // get rule
  let ruleStr = rules[ruleKey];
  ruleStr = ruleStr.split(",");

  for (let i = 0; i < ruleStr.length; i++) {
    let rule = ruleStr[i];
    console.log(rule);

    if (rule.indexOf(">") !== -1) {
      const [category, rest] = rule.split(">");
      let [val, goto] = rest.split(":");
      val = parseInt(val);

      let r = [...part[category]];
      let r2 = [...r];
      //
      r[0] = val + 1;
      r2[1] = val;

      if (r[0] <= r[1]) {
        let newPart = { ...part, [category]: r };
        interpretRule(goto, newPart);
      }
      if (r2[0] <= r2[1]) {
        part = { ...part, [category]: r2 };
        continue;
      }
    } else if (rule.indexOf("<") !== -1) {
      console.log("less than");
      const [category, rest] = rule.split("<");
      let [val, goto] = rest.split(":");
      val = parseInt(val);

      let r = [...part[category]];
      let r2 = [...r];
      //
      r[1] = val - 1;
      r2[0] = val;

      if (r[0] <= r[1]) {
        let newPart = { ...part, [category]: r };
        interpretRule(goto, newPart);
      }
      if (r2[0] <= r2[1]) {
        part = { ...part, [category]: r2 };
        continue;
      }
    } else {
      interpretRule(rule, part);
      return;
    }
  }
}

console.log("accepted", accepted);

let sum = 0;

for (const item of accepted) {
  let possibilities = 0;
  possibilities +=
    (item["x"][1] - item["x"][0] + 1) *
    (item["m"][1] - item["m"][0] + 1) *
    (item["s"][1] - item["s"][0] + 1) *
    (item["a"][1] - item["a"][0] + 1);
    sum += possibilities
}


console.log("sum", sum)