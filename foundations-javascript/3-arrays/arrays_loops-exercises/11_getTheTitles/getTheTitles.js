const getTheTitles = function(books) {
   let newArray = [];
   for (let book of books) {
      newArray.push(book.title);
   }

   return newArray;
};

// Do not edit below this line
module.exports = getTheTitles;
