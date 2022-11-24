import { BoardType, PlayerTurn } from "./types";
export function checkForWinner({
  gameBoard,
  setWinner,
  playerTurn,
}: {
  gameBoard: BoardType;
  setWinner: React.Dispatch<React.SetStateAction<"X" | "O" | null>>;
  playerTurn: PlayerTurn;
}): null | "X" | "O" {
  // TODO loop over all possible win combos (rows, columns, diagonals)
  // const didSomeoneWin
  // we won't check empty strings

  let nextWinner: null | "X" | "O" = null;
  // if there was a winner, put it in nextWinner
  WIN_COMBOS.forEach(function (winningBoard) {
    // does the game state match this winning board combo?
    // start off as true, check each tile, turn to false if it doesn't match
    let doesThisBoardMatchGameState = true;

    // e.g. board = [
    //   ["X", "X", "X"],
    //   ["", "", ""],
    //   ["", "", ""],
    // ],
    winningBoard.forEach(function (row, rowIdx) {
      row.forEach(function (tileInWinningBoard /* "X"|"O"|"" */, colIdx) {
        if (tileInWinningBoard === "") {
          return;
        } else {
          // check against the matching tile in the game state (the real board)
          const matchingTileInGameBoard = gameBoard[rowIdx][colIdx];
          // if it DOESN'T match, turn doesThisBoardMatchGameState false
          if (tileInWinningBoard !== matchingTileInGameBoard) {
            doesThisBoardMatchGameState = false;
          }
        }
      });
    });

    const didSomeoneWin = doesThisBoardMatchGameState;

    // we've checked the board, so if it matches, set nextWinner appropriately
    if (didSomeoneWin) {
      // check IF there's a winner at all (we can derive who won from playerTurn)
      if (playerTurn === "X") {
        nextWinner = "X";
      } else {
        nextWinner = "O";
      }
      // TODO refactor nextWinner to true/false

      console.log(
        "🚀 ~ file: checkForWinner.tsx ~ line 47 ~ nextWinner",
        nextWinner
      );
      setWinner(nextWinner as "X" | "O");
      return nextWinner;
    }
  });

  return nextWinner;
}

const WIN_COMBOS = [
  // TODO create all winning boards (use shortcuts!)
  [
    // for example, when we check against this one, we'll only check the top row
    ["X", "X", "X"],
    ["", "", ""],
    ["", "", ""],
  ],

  [
    ["", "", ""],
    ["X", "X", "X"],
    ["", "", ""],
  ],

  [
    ["", "", ""],
    ["", "", ""],
    ["X", "X", "X"],
  ],

  [
    ["X", "", ""],
    ["X", "", ""],
    ["X", "", ""],
  ],

  [
    ["", "X", ""],
    ["", "X", ""],
    ["", "X", ""],
  ],

  [
    ["", "", "X"],
    ["", "", "X"],
    ["", "", "X"],
  ],

  [
    ["X", "", ""],
    ["", "X", ""],
    ["", "", "X"],
  ],

  [
    ["", "", "X"],
    ["", "X", ""],
    ["X", "", ""],
  ],

  [
    ["O", "O", "O"],
    ["", "", ""],
    ["", "", ""],
  ],

  [
    ["", "", ""],
    ["O", "O", "O"],
    ["", "", ""],
  ],

  [
    ["", "", ""],
    ["", "", ""],
    ["O", "O", "O"],
  ],

  [
    ["O", "", ""],
    ["O", "", ""],
    ["O", "", ""],
  ],

  [
    ["", "O", ""],
    ["", "O", ""],
    ["", "O", ""],
  ],

  [
    ["", "", "O"],
    ["", "", "O"],
    ["", "", "O"],
  ],

  [
    ["O", "", ""],
    ["", "O", ""],
    ["", "", "O"],
  ],

  [
    ["", "", "O"],
    ["", "O", ""],
    ["O", "", ""],
  ],
];
