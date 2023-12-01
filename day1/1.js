const fs = require('fs');
let input = fs.readFileSync('day1/input.txt', "utf-8").split('\n');

let sum = 0; 
let nums = '0123456789'

// extract every single digit in string, in order, and add to array
for(const line of input){
  let digits = [];
  for(let i = 0; i < line.length; i++){
    const char = line[i];
    if(nums.includes(char)){
      digits.push(parseInt(char));
    }
  }
  // use first and last digits to increase sum
  // first digit is in the tens position of the two digit number
  sum += digits[0] * 10;
  sum += digits[digits.length-1];
}

console.log(sum);