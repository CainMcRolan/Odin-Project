function Player(name, marker) {
   this.name = name;
   this.marker = marker;
   this.sayName = function() {
      console.log(this.name)
   };
}

const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');
// player1.sayName(); // logs 'steve'
// player2.sayName(); // logs 'also steve'

console.log(Object.getPrototypeOf(player1) === Player.prototype); // returns true
// console.log(Object.getPrototypeOf(player2)); // returns true
// console.log(Player.prototype);


let head = {
   glasses: 1
};

let table = {
   __proto__: head,
   pen: 3
};

let bed = {
   __proto__: table,
   sheet: 1,
   pillow: 2
};

let pockets = {
   __proto__: bed,
   money: 2000
};

let hamster = {
   stomach: '',
 
   eat(food) {
     this.stomach += food;
   }
 };
 
 let speedy = {
   __proto__: hamster
 };
 
 let lazy = {
   __proto__: hamster
 };
 
 // This one found the food
 speedy.eat("apple");
 console.log( speedy.stomach ); // apple
 
 lazy.eat('bitches');
 // This one also has it, why? fix please.
 console.log( lazy.stomach ); // apple