const findTheOldest = function(people) {
   let ageBracket = [];
   let currentYear = new Date().getFullYear();
  
   ageBracket = people.map((person) => {
      person.yearOfDeath = person.yearOfDeath || currentYear;
      let age = person.yearOfDeath - person.yearOfBirth;
      return {name: person.name, age: age};
   })

   let oldest = ageBracket.reduce((currentPerson, nextPerson) => {
      return currentPerson.age > nextPerson.age ? currentPerson: nextPerson;
   }) 

   return oldest;
};

// Do not edit below this line
module.exports = findTheOldest;
