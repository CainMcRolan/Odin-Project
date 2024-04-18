function getComputerChoice() {
   const random = Math.random();
   if (random <= 1/3) return "rock";
   if (random > 1/3 && random <= 2/3) return "paper";
   if (random > 2/3 && random <= 1) return "scissors";
}

let score = {
   me: 0,
   computer: 0,
   tie: 0,
}


function playRound() {
   const playerSelection = prompt('Enter your Selection!');
   let computer = getComputerChoice();
   let player = playerSelection.toLowerCase();
   
   let result = null;
   
   if (computer === 'rock') {
      if (player === 'paper') {
         score.me++;
         result = "You win, paper beats rock!";
      } else if (player === 'scissors'){
         score.computer++;
         result = "You lose, scissors beats rock!";
      } else {
         score.tie++;
         result = "Its a tie.";
      }
   } else if (computer === 'paper') {
      if (player === 'scissors') {
         score.me++;
         result = "You win, scissors beats papers!";
      } else if (player === 'rock'){
         score.computer++;
         result = "You lose, paper beats rocks!";
      } else {
         score.tie++;
         result = "Its a tie.";
      }
   } else {
      if (player === 'rock') {
         score.me++;
         result = "You win, rock beats scissors!";
      } else if (player === 'paper'){
         score.computer++;
         result = "You lose, scissors beats paper!";
      } else {
         score.tie++;
         result = "Its a tie.";
      }
   }

   console.log(`Player: ${player}, Computer: ${computer}`);
   console.log(`${result}`);
   console.log(`Player: ${score.me}, Computer: ${score.computer}, Ties: ${score.tie}`);
}

for (let i = 0; i < 5; i++) {
   playRound();
}

if (score.me > score.computer) {
   console.log("you Win!");
} else if (score.computer > score.me) {
   console.log("Computer Wins!");
} else {
   console.log("Its a Tie.");
} 

