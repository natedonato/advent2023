const fs = require("fs");
let input = fs.readFileSync("day1/input.txt", "utf-8").split("\n");

let sum = 0;
let nums = "0123456789";
const strings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];


for (const line of input) {
  // [index, digit_value: integer]
  let digits = [];
  
  // record number characters in digit array, this time with added index
  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (nums.includes(char)) {
      digits.push([i ,parseInt(char)]);
    }

  }

  // loop through each number-string and find the first and last index of those strings
  for (let j = 0; j < strings.length; j++) {
    let s = strings[j];

    let f = line.indexOf(s);
    let l = line.lastIndexOf(s);

    // if found index of string & it occurs before our current first digit index, add to front of digits array (converted to integer)
    if (f !== -1 && (digits.length < 1 || f < digits[0][0])) {
      digits.unshift([f, j + 1]);
    }
    // if found & occured after last digit index, add to end of digits array
    if (l !== -1 && (digits.length < 1 || l > digits[digits.length - 1][0])) {
      digits.push([l, j + 1]);
    }
  }

  // make two digit number from first and last extracted "digits"
  let val = digits[0][1] * 10;
  val += digits[digits.length - 1][1];

  sum += val;
}

console.log(sum);