const palindromes = function (word) {
   let oldWord = word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ +]/g, '').toLowerCase();
   let newWord = oldWord.split('').reverse().join('');;
  
   return newWord == oldWord;
};

// Do not edit below this line
module.exports = palindromes;

