const fs = require("fs");
let input = fs.readFileSync("day2/input.txt", "utf-8").split("\n");

// let input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split('\n');

let sum = 0;
// const limits = { red: 12, green: 13, blue: 14 };

for (const line of input) {
  let [id, sets] = line.slice(5).split(": ");
  sets = sets.split("; ");

  let power = {red: 0, blue: 0, green: 0};

  for (const set of sets) {
    let pairs = set.split(", ");
    pairs = pairs.map((el) => {
      let [num, color] = el.split(" ");
      return { color, num: parseInt(num) };
    });

    pairs.forEach((el) => {
      if (power[el.color] < el.num) {
        power[el.color] = el.num
      }
    });
  }

  
  sum += power.blue * power.green * power.red
  
}

console.log(sum);
