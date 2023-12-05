const fs = require("fs");
let input = fs.readFileSync("day5/input.txt", "utf-8").split("\n\n");

const seeds1 = input[0]
  .slice(7)
  .split(" ")
  .map((el) => parseInt(el));
let seeds = [];

// tranform seed input into ranges
// [start of current seeds, end of current seeds]
for(let i = 0; i < seeds1.length; i += 2){
  seeds.push([seeds1[i], seeds1[i+1] + seeds1[i] - 1])
}

// starting seeds
console.log("Starting seed ranges");
console.log(seeds);


// iterate over every step in the almanac
for (let i = 1; i < input.length; i++) {
  let group = input[i].split("\n");
  
  // almanac stage name for reference
  const name = group.shift();
  
  // parse and reformat this stage's maps 
  // now: [start of input range, end of input range, offset of destination]
  let maps = group.map((el) => el.split(" "));
  maps = maps.map((el) => [
    parseInt(el[1]),
    parseInt(el[2] - 1 + parseInt(el[1])),
    parseInt(el[0]),
  ]);
  maps.forEach((map) => {
    map[2] = map[2] - map[0];
  });
  

  // sort maps ascending to help make gaps
  maps = maps.sort((a, b) => a[0] - b[0]);

  // make new maps to cover the "gaps" inbetween or around the given maps
  // gap maps have destination offset = 0
  let gaps = [];
  // start from zero
  let last = 0;
  for (const map of maps) {
    // if theres a gap, make a new gap map 
    if (last < map[0] - 1) {
      let gap = [last, map[0] - 1, 0];
      gaps.push(gap);
    }
    last = map[1] + 1;
  }
  //make one last gap range going up to infinity (JS rocks for having infinity as an easy value)
  gaps.push([last, Infinity, 0]);
  
  // combine the almanac maps and our new "gap" maps
  maps = [...maps, ...gaps]
  maps = maps.sort((a, b) => a[0] - b[0]);
  // maps now cover all possible ranges from 0 to infinity 


  // process our seed ranges and find the new ranges at the end of this stage
  let nextSeeds = [];

  // iterate through ranges
  for (let i = 0; i < seeds.length; i++) {
    
    // current active seed range
    let seed = seeds[i];

    // check the current range against all our maps for intersections
    for (const map of maps) {
      let intersect = handleIntersect(seed, map);
      if (intersect !== false) {
        // when there's an intersection make a new seed using the intersection range and the map's offset value
        let new_seed_range = [intersect[0] + map[2], intersect[1] + map[2]]
        nextSeeds.push(new_seed_range);
      }
    }
  }

  // pass the new seeds into the next stage
  seeds = nextSeeds;
}


console.log("final seed ranges")
console.log(seeds)
console.log('lowest seed:')
console.log(seeds.sort((a,b) => a[0] - b[0])[0][0])




// range intersction helper
// returns false if no intersection, or [start, end] (inclusive) if there is intersection
function handleIntersect(seed, map){
  let start = Math.max(seed[0], map[0]);
  let finish = Math.min(seed[1], map[1]);

  if(start <= finish){
    return([start, finish]);
  }else{
    return false
  }
}