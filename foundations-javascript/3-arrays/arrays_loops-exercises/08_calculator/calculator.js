const add = function(num1, num2) {
  return num1 + num2;
};

const subtract = function(num1, num2) {
  return num1 - num2;
};

const sum = function(nums) {
  let answer = 0;
  for (num of nums) {
    answer += num;
  }

  return answer;
};

const multiply = function(nums) {
  return nums.reduce((acc, cur) => acc * cur)
};

const power = function(num, power) {
  return num ** power;
};

const factorial = function(num) {
  let answer = 1;
  for (let i = 1; i <= num; i++) {
    answer *= i;
  }
  return answer;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
