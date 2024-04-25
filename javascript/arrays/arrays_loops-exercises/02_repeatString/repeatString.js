const repeatString = function(string, numOfRepeats) {
      if (numOfRepeats < 0) return 'ERROR';
      let newString = '';
      for (let i = 0; i < numOfRepeats; ++i) {
         newString += string;
      }
      return newString;
};

// Do not edit below this line
module.exports = repeatString;
