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

  return { getBoard, markSpot, printBoard };
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
    },
    {
      name: playerTwoName,
      token: -1,
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
