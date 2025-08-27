function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function Gameboard() {
  const board = [];
  const size = 3;
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const markSpot = (posX, posY, playerToken) => {
    if (board[posX][posY].getValue() !== 0) {
      console.log("Cell already marked or invalid");
      return false;
    }

    if (playerToken !== 1 && playerToken !== -1) {
      console.log("Invalid playerToken");
      return false;
    }

    board[posX][posY].addToken(playerToken);
    console.log(
      `Cell (${posX},${posY}) marked with playerToken ${
        playerToken === 1 ? "X" : "o"
      }`,
    );
    return true;
  };

  const printBoard = () => {
    console.table(
      board.map((row) => {
        return row.map((spot) =>
          spot.getValue() === 1
            ? "X"
            : spot.getValue() === -1
              ? "o"
              : spot.getValue(),
        );
      }),
    );
  };

  const clearBoard = () => {
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j].addToken(0);
      }
    }
  }

  return { getBoard, markSpot, printBoard, clearBoard };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two",
) {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: 1,
      wins: 0,
    },
    {
      name: playerTwoName,
      token: -1,
      wins: 0,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const clearBoard = () => {
    board.clearBoard();
  }

  const checkWinner = () => {
    const n = board.length;
    let principalDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
    let activePlayerSum = activePlayer.getValue()*n;

    for( let i = 0 ; i < n ; i++ ){
      principalDiagonalSum += board[i][i].getValue();
      secondaryDiagonalSum += board[i][n - 1 - i].getValue();
    }

    if(principalDiagonalSum === activePlayerSum || secondaryDiagonalSum === activePlayer){
      printNewRound();
      activePlayer.wins++;
      console.log(`${activePlayer.name} wins!`);
      clearBoard();
      switchPlayerTurn();
      return true;
    }

    return false;
  }

  const playRound = (posX, posY) => {
    console.log(
      `Marking ${getActivePlayer().name}'s token into ${posX}, ${posY} spot...`,
    );

    if (board.markSpot(posX, posY, getActivePlayer().token) === false) {
      console.log("Invalid move!");
      printNewRound();
      return false;
    }
    /* check for winner logic goes here */
    if(checkWinner()) return true;

    switchPlayerTurn();
    printNewRound();
  };

  // Initial play game message
  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
