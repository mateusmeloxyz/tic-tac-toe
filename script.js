function Gameboard() {
  const size = 3;
  const board = Array(size)
    .fill()
    .map(() => Array(size).fill(0));

  const getBoard = () => board;

  const markSpot = (posX, posY, playerToken) => {
    if (board[posX][posY] !== 0) return "Cell already marked";

    if (posX >= size || posX < 0) return "Invalid cell";

    if (posY >= size || posY < 0) return "Invalid cell";

    if (playerToken !== 1 && playerToken !== -1) return "Invalid playerToken";

    board[posX][posY] = playerToken;
    return `Cell (${posX},${posY}) marked with playerToken ${
      playerToken === 1 ? "X" : "O"
    }`;
  };

  const printBoard = () => {
    console.table(
      board.map((row) => {
        return row.map((spot) => (spot === 1 ? "X" : spot === -1 ? "O" : spot));
      }),
    );
  };

  return { getBoard, markSpot, printBoard };
}

const board = Gameboard();

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
