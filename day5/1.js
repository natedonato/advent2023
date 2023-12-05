const fs = require("fs");
let input = fs.readFileSync("day5/input.txt", "utf-8").split("\n\n");

const seeds = input[0].slice(7).split(" ").map(el => parseInt(el));
console.log("starting seeds")
console.log(seeds)

for(let i = 1; i < input.length; i++){
  console.log("\n");

  let group = input[i].split("\n")
  const name = group.shift();
  console.log("group name", name)
  // destination range, source range, range length
  let maps = group.map(el => el.split(" "));
  maps = maps.map(el => el.map(el => parseInt(el)))
  console.log("group maps", maps)

  for(let i = 0; i < seeds.length; i++){
    let seed = seeds[i];
    console.log("current seed", seed)

    let map = maps.filter(el => 
      (el[1] <= seed && seed< el[1] + el[2])
    )

    if(map.length === 1){
      let [d,s,r] = map[0]
      seeds[i] = seeds[i] - s + d;
    }else{
      // seed stays same
    }
  }
  console.log(seeds)
}

console.log(seeds.sort((a,b) => a-b)[0])