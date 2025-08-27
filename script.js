function Cell() {
  let value = 0;

  const markSpot = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    markSpot,
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
      return "Cell already marked or invalid";
    }

    if (playerToken !== 1 && playerToken !== -1) return "Invalid playerToken";

    board[posX][posY].markSpot(playerToken);
    return `Cell (${posX},${posY}) marked with playerToken ${
      playerToken === 1 ? "X" : "o"
    }`;
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

const board = Gameboard();

console.table(board.getBoard());

board.printBoard();
console.log(board.markSpot(2, 2, 1));
board.printBoard();
console.log(board.markSpot(2, 2, 1));
board.printBoard();
console.log(board.markSpot(2, 2, -1));
board.printBoard();
console.log(board.markSpot(1, 1, -1));
board.printBoard();
console.log(board.markSpot(1, 0, 10));
