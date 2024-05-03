const removeFromArray = function(myArray, ...myNum) {
   let newArray = myArray.filter((number) => !myNum.includes(number));
   return newArray;
};

// Do not edit below this line
module.exports = removeFromArray;

