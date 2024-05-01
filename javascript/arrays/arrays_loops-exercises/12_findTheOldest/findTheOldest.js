const findTheOldest = function(people) {
   let currDate = new Date().getFullYear();
   const ageArray = people.map((p) => {
         let DoD = p.yearOfDeath || currDate;
         let age = DoD - p.yearOfBirth;
         return {'name': p.name, 'age': age};
   })

   return ageArray.reduce((acc, cur) => {
         return acc.age > cur.age ? acc: cur;
   })
};

// Do not edit below this line
module.exports = findTheOldest;
