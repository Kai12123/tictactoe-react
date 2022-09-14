import { useState } from "react";
import "./App.css";
import tictactoeBackgroundImgUrl from "./assets/tictactoe-grid.png";

// what state does our game need?
type GameStateType = {
  gridMarkers: GridMarkerType[];
  playerTurn: 1 | 2;
};

/** represents one X or O inside the grid */
type GridMarkerType = {
  /** if true, show "X", else show "O" */
  isX: boolean;
  /** number between 1-9, position in the grid from top-left rightwards */
  position: GridPosition;
};
type GridPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

function App() {
  // all of our state will live at the App level
  // and we'll pass it down as props to the child components
  const [{ gridMarkers, playerTurn }, setState] = useState<GameStateType>({
    gridMarkers: [
      {
        isX: false,
        position: 1,
      },
    ],
    playerTurn: 1,
  });

  return (
    <div className="App">
      <Grid gridMarkers={gridMarkers} />
      <GameInfo playerTurn={playerTurn} />
    </div>
  );
}

export default App;

const GRID_WIDTH = 360;

function Grid({ gridMarkers }: { gridMarkers: GridMarkerType[] }) {
  console.log("🚀 ~ file: App.tsx ~ line 48 ~ Grid ~ gridMarkers", gridMarkers);
  return (
    <div
      style={{ position: "relative", width: GRID_WIDTH, height: GRID_WIDTH }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
        }}
      >
        <GridImageBackground />
      </div>
      {/* for each grid marker, make a grid marker */}
      {gridMarkers.map(function (gridMarker, idx) {
        // TODO calculate the "top, left" values for this item,
        // TODO given its position and GRID_WIDTH
        // -> turn position (1,2,3), (4,5,6) into (0*GRID_WIDTH, 1/3*GRID_WIDTH,2/3*GRID_WIDTH)
        // TODO e.g. left = (position%3) * GRID_WIDTH
        const left = ((gridMarker.position % 3) / 3) * GRID_WIDTH;
        // TODO top
        return (
          <div
            key={gridMarker.position}
            style={{
              position: "absolute",
              left,
            }}
          >
            GridMarker
          </div>
        );
      })}
    </div>
  );
}
const GridImageBackground = () => {
  return (
    <img style={{ width: "100%" }} src={tictactoeBackgroundImgUrl} alt="" />
  );
};
function GameInfo({ playerTurn }: { playerTurn: 1 | 2 }) {
  return (
    <div>
      <div className="player-label">
        {playerTurn === 1 ? <div>Your turn</div> : <div> Robot's turn</div>}
      </div>
    </div>
  );
}
