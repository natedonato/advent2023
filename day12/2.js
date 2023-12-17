const fs = require("fs");
let input = fs.readFileSync("./day12/input.txt", "utf-8");
input = input.split("\n").map((el) => el.split(" "));

// extend inputs:
for(let i = 0; i < input.length; i++){
  let [spring, count] = input[i]

  let newSpring = ""
  let newCount = ""

  for(let i = 0; i < 5; i++){
    newSpring += spring + "?"
    newCount += count + ","
  }
  newSpring = newSpring.slice(0,-1)
  newCount = newCount.slice(0,-1)

  input[i] = [newSpring, newCount]
}
// console.log(input)


let sum = 0;

let memo = {};
for (const line of input) {
  memo = {}
  let [springs, key] = line;
  let target_groups = key;
  target_groups = target_groups.split(",").map(el => parseInt(el));

  let possibilities = solve(springs, 0, [], 0, target_groups);
  // console.log(possibilities);

  sum += possibilities;
}

console.log("sum", sum);

function testGroups(previous_groups, current_group_length, target_groups){
  
  // check prev groups
  for(let i = 0; i < previous_groups.length; i++){
    if(previous_groups[i] !== target_groups[i]){
      return false;
    }
  }
  // check current groups
  if(current_group_length > 0 && current_group_length > target_groups[previous_groups.length]){
    return false
  }

  // check we haven't gone over 
  if(previous_groups.length > target_groups.length || (previous_groups.length === current_group_length && current_group_length === 0)){
    return false;
  }
  // check if it's a perfect match
  if(previous_groups.length === target_groups.length && current_group_length === 0){
    return "perfect"
  }
  // return true if still potentially valid
  return true;
}

// solve recursively
function solve(spring, current_index, previous_groups, current_group_length, target_groups ){
  // memo
  let key = `${current_index};${previous_groups.join(",")};${current_group_length}`
  if(memo[key] !== undefined){
    // console.log('cache hit')
    return memo[key]
  }
  
  // prevent mutation
  previous_groups = [...previous_groups];
  // end of string logic goes here
  // finish any current group
  // check if final group is valid (and is the true final group), return 0 if not valid or 1 if valid
  if(current_index === spring.length){
    if(current_group_length !== 0){
      previous_groups.push(current_group_length)
      current_group_length = 0;
    }
    if(testGroups(previous_groups, current_group_length, target_groups) === "perfect"){
      memo[key] = 1;
      return 1;
    }else{
      memo[key] = 0
      return 0
    }
  }

  // test the current character
  let nextChar = spring[current_index];

  if(nextChar === "."){
    if(current_group_length === 0){
      // continue to next char
      let res = solve(spring, current_index + 1, previous_groups, current_group_length, target_groups);
      memo[key] = res;
      return res;
    }else{
      // end current group
      previous_groups.push(current_group_length);
      current_group_length = 0;
      //check if group is valid validity here
        // return 0 if not valid
      if(testGroups(previous_groups, current_group_length, target_groups) === false){
        memo[key] = 0;
        return 0
      }
      let res = solve(spring, current_index + 1, previous_groups, current_group_length, target_groups);
      memo[key] = res;
      return res;
    }
  } else if(nextChar === "#"){
    // extend or start current group
    current_group_length += 1;
    // check valid, return 0 if not valid
    if (
      testGroups(previous_groups, current_group_length, target_groups) === false
    ) {
      memo[key] = 0;
      return 0;
    }
    // solve next char
    return solve(spring, current_index + 1, previous_groups, current_group_length, target_groups);
  } else if (nextChar === "?"){
    // need to handle both cases
    let left;
    let right;

    // if "#"
    // check valid, return 0 if not valid
    if (
      testGroups(previous_groups, current_group_length + 1, target_groups) === false
    ) {
      right = 0;
    }else{
      // make recursive half
      right = solve(
        spring,
        current_index + 1,
        previous_groups,
        current_group_length + 1,
        target_groups
      );
    }

    // now if dot
    if (current_group_length === 0) {
      // continue to next char
      left = solve(
        spring,
        current_index + 1,
        previous_groups,
        current_group_length,
        target_groups
      );
    } else {
      // end current group
      previous_groups.push(current_group_length);
      current_group_length = 0;
      //check if group is valid validity here
      // return 0 if not valid
      if (
        testGroups(previous_groups, current_group_length, target_groups) ===
        false
      ) {
        left = 0;
      }else{
        left = solve(
          spring,
          current_index + 1,
          previous_groups,
          current_group_length,
          target_groups
        );
      }
    }

    // combine halves
    let res = left + right;
    memo[key] = res;
    return res;
  }else{
    throw new Error("not processed properly")
  }
}


// start at index 0
// 
// if char is a ? and not currently in a group
//  recurse:
//     start a group and continue
//     don't start a group and continue
// if char is a . and not in a group
//    just continue
// if char is a . and already in a group
//    end current group, check length & validate with target groups (return 0 if current group makes things invalid)
// if char is a # and not already in a group
//    start a group and continue (if no more groups needed, return 0)
// if char is a # and already in a group
//    add to group, check length and and continue or return 0 if current group too long
// if char is a ? and already in a group
//    check target groups.  
//         if current group not long enough, add a # and continue
//         if current group is long enough, end group, add . and continue
// if end of line
//    end current group if in group, check vs target groups, return 1 or 0
