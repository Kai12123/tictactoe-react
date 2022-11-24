import { useState } from "react";
import styled from "styled-components";
import { checkForWinner } from "../checkForWinner";
import { BoardType, PlayerTurn } from "../types";

function deepCopyObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function Grid({
  playerTurn,
  goToNextTurn,
  winner,
  setWinner,
}: {
  playerTurn: PlayerTurn;
  goToNextTurn: () => void;
  winner: "X" | "O" | null;
  setWinner: React.Dispatch<React.SetStateAction<"X" | "O" | null>>;
}) {
  const [xsAndOsRows, setXsAndOs] = useState<BoardType>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""], // row 3
  ]);

  /** set either X or O inside the square, depending on whose turn it is
   *
   * switch to the next player's turn
   */
  function handleClickRowCol(rowNum: number, colNum: number) {
    // TODO fill in X or O depending on playerTurn
    // e.g. imagine we clicked row 2, col 3
    // TODO try xsAndOs.map((row)=>{return newRow})
    const nextChar = playerTurn === "X" ? "X" : "O";

    // * we're doing lots of looping given that we just wanted to change one item
    // const nextXsAndOs = xsAndOsRows.map((row, idx) => {
    //   let newRow = row; // TODO gotcha - shouldn't mutate objects/arrays
    //   console.log(row); // ["","",""]
    //   // determine if this is the row we clicked
    //   const isThisRow = rowNum === idx + 1;
    //   if (isThisRow) {
    //     // modify the item at position `colNum`
    //     newRow = newRow.map((gridItem, colIdx) => {
    //       const isThisCol = colNum === colIdx + 1;
    //       if (isThisCol) {
    //         return nextChar;
    //       }
    //       return gridItem;
    //     });
    //   }
    //   // determine if this is the col we clicked
    //   return newRow;
    // });
    // * what if we just try modifying the one item
    // ! when we mutate a "copy" (just by assignment "=") of an object, we're actually modifying the original!
    // ! when you assign an object type, it's actually assigning the pointer to that location in memory
    const nextXsAndOs = deepCopyObject(xsAndOsRows);
    // because we're 'indexing into an array', we need to use the index (starts at 0)
    const [rowIdx, colIdx] = [rowNum - 1, colNum - 1];
    // literally just reassign the item at this position
    nextXsAndOs[rowIdx][colIdx] = nextChar;

    const clickedBoxValue = xsAndOsRows[rowIdx][colIdx];

    const isSomethingInBox = Boolean(clickedBoxValue);

    if (isSomethingInBox) {
      return;
    }

    setXsAndOs(nextXsAndOs);

    // *check if someone just won the game, and do something

    const nextWinner = checkForWinner({
      gameBoard: nextXsAndOs,
      setWinner,
      playerTurn,
    });
    // bug behaviour: when I click on a "x" box, it switches to "o"
    // expected behaviour: it should stay "x"
    if (!nextWinner) {
      goToNextTurn();
    }
  }

  return (
    <GridStyles>
      {xsAndOsRows.map((row, rowIdx) => {
        const rowNum = rowIdx + 1;
        return row.map((cellValue, colIdx) => {
          const colNum = colIdx + 1;
          return (
            <div
              key={`${rowIdx}${colIdx}`}
              className={`cell row-${rowNum} col-${colNum}`}
              onClick={() => {
                if (cellValue) {
                  return;
                }
                handleClickRowCol(rowNum, colNum);
              }}
            >
              {cellValue}
            </div>
          );
        });
      })}
    </GridStyles>
  );
}
const CELL_WIDTH = 120;
const BORDER_WIDTH = 1;
const GRID_WIDTH = CELL_WIDTH + BORDER_WIDTH;
const GridStyles = styled.div`
  display: grid;
  grid-template-columns: ${GRID_WIDTH}px ${GRID_WIDTH}px ${GRID_WIDTH}px;
  .cell {
    border: ${BORDER_WIDTH}px solid black;
    width: ${CELL_WIDTH}px;
    height: ${CELL_WIDTH}px;
  }
`;
