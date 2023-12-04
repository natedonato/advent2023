const fs = require("fs");
let input = fs.readFileSync("day4/input.txt", "utf-8").split("\n");

let cards = {};

for (let line of input) {
  let id = line.slice(5).split(":")[0]
  while(id[0] === " "){id = id.slice(1)};

  let [wins, mine] = line
    .slice(8)
    .split(" | ")
    .map((el) => el.split(" ").filter((el) => el !== "" && el !== ":"));

  cards[id] = {count: 1, winning: wins, mine, id}
}


for(let i = 1; i <= input.length; i++){
  let card = cards[i];

  let j = i+1
  for (const num of card.winning) {
    if (card.mine.includes(num) && j <= input.length) {
      cards[j].count += card.count;
      j += 1
    }
  }
  
}

let total = Object.values(cards).reduce((acc, el) => acc += el.count, 0 )
console.log(total)