const fibonacci = function(num) {
   if (num < 0) return 'OOPS';
   num = parseInt(num);
   if (num === 0) return 0;
   
   current = 1;
   future = 0;

   for (let i = 2; i <= num; i++) {
      let newNum = current + future;
      future = current;
      current = newNum;
   }

   return current;
};

// Do not edit below this line
module.exports = fibonacci;

