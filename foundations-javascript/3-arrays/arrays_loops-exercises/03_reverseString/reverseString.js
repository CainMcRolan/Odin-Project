const reverseString = function(string) {
   let stringArray = string.split('');
   let reversedString = '';
   for (let i = stringArray.length - 1; i >= 0; --i){
      reversedString += stringArray[i];
   }

   return reversedString;
};

// Do not edit below this line
module.exports = reverseString;
