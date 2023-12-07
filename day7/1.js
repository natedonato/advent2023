const fs = require("fs");
let input = fs.readFileSync("day7/input.txt", "utf-8");

input = input.split("\n").map((el) => el.split(" "));

let rank = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
let sortedHands = new Array(7).fill(0).map((el) => new Array());

for (const line of input) {
  let [hand, bid] = line;
  bid = parseInt(bid);
  identifyHand(hand, bid);
}

function identifyHand(hand, bid) {
  let count = {};

  for (const card of hand.split("")) {
    if (!count[card]) {
      count[card] = 1;
    } else {
      count[card] += 1;
    }
  }

  let counts = Object.values(count).sort((a, b) => b - a);
  
  if (counts[0] === 5) {
    sortedHands[0].push({ hand, bid });
    // console.log("5 of a kind");
  } else if (counts[0] === 4) {
    sortedHands[1].push({ hand, bid });
    // console.log("4 of a kind");
  } else if (counts[0] === 3 && counts[1] === 2) {
    sortedHands[2].push({ hand, bid });
    // console.log("full house");
  } else if (counts[0] === 3) {
    sortedHands[3].push({ hand, bid });
    // console.log("3 of a kind");
  } else if (counts[0] === 2 && counts[1] === 2) {
    sortedHands[4].push({ hand, bid });
    // console.log("two pair");
  } else if (counts[0] === 2) {
    sortedHands[5].push({ hand, bid });
    // console.log("one pair");
  } else {
    sortedHands[6].push({ hand, bid });
    // console.log("high card");
  }
}

sortedHands = sortedHands.map((el) =>
  el.sort((a, b) => tiebreak(b.hand, a.hand))
);

let finalRankings = [];

for (const set of sortedHands) {
  for (const item of set) {
    finalRankings.unshift(item);
  }
}

let winnings = 0;

for (let i = 0; i < finalRankings.length; i++) {
  winnings += (i + 1) * finalRankings[i].bid;
}

console.log(winnings);

function tiebreak(handA, handB) {
  for (let i = 0; i < handA.length; i++) {
    if (rank.indexOf(handA.charAt(i)) < rank.indexOf(handB.charAt(i))) {
      return 1;
    } else if (rank.indexOf(handA.charAt(i)) > rank.indexOf(handB.charAt(i))) {
      return -1;
    }
  }

  console.log(handA, handB);
  throw new Error("tie?");
}
