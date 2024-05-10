//TIC TAC TOE GAME
startGame();
function startGame() {
   const dialog1 = document.querySelector('.dialog1');
   dialog1.showModal();
   const submitButton = document.querySelector('.submit');
   submitButton.addEventListener('click', () => {
      let getInitialPlayer = getCredentials();
      screenController();
      document.querySelector('.turn').textContent = `${getInitialPlayer.getPlayer1()} Turn...`;
   })
}

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
            if (box.getValue() === '') return false;
         }
      }
      return true;
   }

   const resetBoard = () => {
      for (let boxes of board) {
         for (let box of boxes) {
            box.setValue('');
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
   let value = '';

   const setValue = (playerTurn) => {
      value = playerTurn;
   };

   const getValue = () => value;

   return {
      setValue,
      getValue,
   }
}

function getCredentials() {
   let player1 = document.querySelector('.player1_input');
   let player2 = document.querySelector('.player2_input');
   return {
      getPlayer1: () => player1.value,
      getPlayer2: () => player2.value,
   }
}

function playerTurn() {
   let getPlayers = getCredentials();
   let players = [
      {
         'playerName': getPlayers.getPlayer1(),
         'value': 'X',
      }, 
      {
         'playerName': getPlayers.getPlayer2(),
         'value': 'O',
      },
   ];
   
   let player = players[0];

   const getPlayerTurn = () => player;
   const setPlayerTurn = () => {
      player == players[0] ? player = players[1]: player = players[0];
   }
   const resetPlayerTurn = () => {
      player = players[0];
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
   let myTurn = turn.getPlayerTurn();

   const initiateGame = (row, column) => {
      let currentTurn = myTurn.value;
      if (myBoard[row][column].getValue() !== '') {
         return;
      }

      console.log(`Current Turn: ${myTurn.playerName}`);
      myBoard[row][column].setValue(currentTurn);

      if (board.checkWin(currentTurn)) {
         console.log(`${currentTurn} Won!`);
         return `Won`;
      }

      if (board.checkDraw()) {
         console.log(`It's a Draw!`);
         return `Draw`;
      }
      turn.setPlayerTurn();
      myTurn = turn.getPlayerTurn();
      console.log(`Next Turn: ${myTurn.playerName}`);
   }

   return {
      initiateGame,
      getBoard: () => board,
      getTurn: () => myTurn.playerName,
      getResetTurn: () => turn,
   }
}

function screenController() {
   const game = GameController();
   const myBoard = game.getBoard(); 
   const resetTurn = game.getResetTurn();
   const playerTurnP = document.querySelector('.turn');
   const boardDiv = document.querySelector('.board');
   const resetButton = document.querySelector('.reset');

   const updateScreen = () => {
      boardDiv.textContent = '';
      let board = game.getBoard();
      board = board.returnBoard();

      board.forEach((row, i) => {
         row.forEach((box, j) => {
            const boxButton = document.createElement('div');
            boxButton.classList.add('box');
            boxButton.textContent = box.getValue();
            boxButton.setAttribute('data', `${i}${j}`);
            boardDiv.append(boxButton);
         })
      })
   }

   function clickHandlerBoard(e) {
      const selectedBox = e.target.getAttribute('data');
      const row = selectedBox.slice(0,1);
      const column = selectedBox.slice(1, 2);
      const getStatus = game.initiateGame(row, column);
      const activePlayer = game.getTurn();

      playerTurnP.textContent = `${activePlayer} Turn...`;
     
      updateScreen();

      switch (getStatus) {
         case 'Won':
            playerTurnP.textContent = `${activePlayer} Won!`;
            boardDiv.removeEventListener("click", clickHandlerBoard);
            break;
         case 'Draw':
            playerTurnP.textContent = `It's a Draw...`;
            boardDiv.removeEventListener("click", clickHandlerBoard);
            break;
      }
   }

   function resetAll() {
      myBoard.resetBoard();
      resetTurn.resetPlayerTurn();
      updateScreen();
      const activePlayer = game.getTurn();
      playerTurnP.textContent = `${activePlayer} Turn...`;
      boardDiv.addEventListener("click", clickHandlerBoard);
   }

   boardDiv.addEventListener("click", clickHandlerBoard);
   resetButton.addEventListener("click", resetAll);

   updateScreen();
}
