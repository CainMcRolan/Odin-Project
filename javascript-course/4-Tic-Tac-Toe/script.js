function gameBoard() {
   let board = [];
   let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ]

   for (let i = 0; i < 3; i++) {
      board.push([]);
      for (let j = 0; j < 3; j++) {
         board[i].push(insertIntoBox());
      }
   }
   
   const returnBoard = () => board;
   const checkWin = (currentPlayerTurn) => {
      let demoBoard = board.flat();
      for (let combination of winningCombinations) {
         if (
            currentPlayerTurn === demoBoard[combination[0]].getValue() &&
            currentPlayerTurn === demoBoard[combination[1]].getValue() &&
            currentPlayerTurn === demoBoard[combination[2]].getValue()
         ) 
         {
            return true;
         }
      }
      return false;
   }
   const checkDraw = () => {
      for (let boxes of board) {
         for (let box of boxes) {
            if (box.getValue() === 0) return false;
         }
      }
      return true;
   }

   const resetBoard = () => {
      for (let boxes of board) {
         for (let box of boxes) {
            box.setValue(0);
         }
      }
   }

   return {
      returnBoard,
      checkWin,
      checkDraw,
      resetBoard,
   }
}

function insertIntoBox() {
   let value = 0;

   const setValue = (playerTurn) => {
      value = playerTurn;
   };

   const getValue = () => value;

   return {
      setValue,
      getValue,
   }
}

function playerTurn() {
   let player = 'X';
   const getPlayerTurn = () => player;
   const setPlayerTurn = () => {
      player === 'X' ? player = 'O': player = 'X';
   }
   const resetPlayerTurn = () => {
      player = 'X';
   }

   return {
      getPlayerTurn,
      setPlayerTurn,
      resetPlayerTurn,
   }
}

function GameController() {
   let board = gameBoard();
   let myBoard = board.returnBoard();
   let turn = playerTurn();

   const initiateGame = (row, column) => {
      let currentTurn = turn.getPlayerTurn();
      if (myBoard[row][column].getValue() !== 0) {
         return;
      }

      console.log(`Current Turn: ${currentTurn}`);
      myBoard[row][column].setValue(currentTurn);

      if (board.checkWin(currentTurn)) {
         console.log(`${currentTurn} Won!`);
         board.resetBoard();
         turn.resetPlayerTurn();
         return;
      }

      if (board.checkDraw()) {
         console.log(`It's a Draw!`);
         board.resetBoard();
         turn.resetPlayerTurn();
         return;
      }
      turn.setPlayerTurn();
      console.log(`Next Turn: ${turn.getPlayerTurn()}`);
   }

   return {
      initiateGame,
   }
}

const game = GameController();
game.initiateGame(0, 2); //X
game.initiateGame(0, 0); //O
game.initiateGame(1, 0); //X
game.initiateGame(0, 1); //O
game.initiateGame(1, 1); //X
game.initiateGame(1, 2); //O
game.initiateGame(2, 1); //X
game.initiateGame(2, 0); //O
game.initiateGame(2, 2); //X