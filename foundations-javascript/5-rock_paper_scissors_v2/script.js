const scoreDisplay = document.querySelector('.score');
const resultMessage = document.querySelector('.result');
const buttons = document.querySelectorAll('.buttonContainer > button');
let isGameFinished = false;

let score = {
   player: 0,
   computer: 0,
   tie: 0,
}

document.querySelector('.buttonContainer').addEventListener('click', (e) => {
   removeHighlight();
   switch (e.target.className) {
      case 'rock': 
         playRound('rock');
         break;
      case 'paper':
         playRound('paper');
         break;
      case 'scissors':
         playRound('scissors');
         break;
   }
})

document.body.addEventListener('keydown', (e) => {
   switch (e.key) {
      case 'r': 
         playRound('rock');
         break;
      case 'p':
         playRound('paper');
         break;
      case 's':
         playRound('scissors');
         break;
   }
})

function playRound(playerSelection) {
   let computer = getComputerChoice();
   let player = playerSelection.toLowerCase();
   let result = null;
   removeHighlight();
   
   switch (computer) {
      case 'rock':
         if (player === 'paper') {
            score.player++;
            result = "You win, paper beats rock!";
         } else if (player === 'scissors'){
            score.computer++;
            result = "You lose, scissors beats rock!";
         } else {
            score.tie++;
            result = "Its a tie.";
         }
         break;
      case 'paper':
         if (player === 'scissors') {
            score.player++;
            result = "You win, scissors beats papers!";
         } else if (player === 'rock'){
            score.computer++;
            result = "You lose, paper beats rocks!";
         } else {
            score.tie++;
            result = "Its a tie.";
         }
         break;
      default:
         if (player === 'rock') {
            score.player++;
            result = "You win, rock beats scissors!";
         } else if (player === 'paper'){
            score.computer++;
            result = "You lose, scissors beats paper!";
         } else {
            score.tie++;
            result = "Its a tie.";
         }
         break;
   }

   resultMessage.innerHTML = `Player: ${player}, Computer: ${computer} <br>  <br>${result}`;
   scoreDisplay.textContent = `Player: ${score.player}, Computer: ${score.computer}, Ties: ${score.tie}`;

   setTimeout(displayWinner, 200);
   addHighlight(playerSelection);
   gameEnded();
}

function getComputerChoice() {
   const random = Math.random();
   if (random <= 1/3) return "rock";
   else if (random <= 2/3) return "paper";
   else return "scissors";
}

function displayWinner() {
   for (let s in score) {
      if (score[s] === 5) {
         alert(`${s} is the winner!!!`);
         isGameFinished = true;
      }
   }
}

function removeHighlight() {
   for (let button of buttons) {
      button.classList.remove('selected');
   }
}

function addHighlight(p) {
   for (let button of buttons) {
      console.log(button);
      if (button.className == p) {
         button.classList.add('selected');
      }
   }
}

function gameEnded() {
   if (isGameFinished) {
      for (let s in score) {
         score[s] = 0;
      }
      resultMessage.innerHTML = ``;
      scoreDisplay.textContent = `Player: ${score.player}, Computer: ${score.computer}, Ties: ${score.tie}`;
      isGameFinished = false;
   }
}

