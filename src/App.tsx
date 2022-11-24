import { useState } from "react";
import "./App.css";
import { GameInfo } from "./components/GameInfo";
import { Grid } from "./components/Grid";
import { PlayerTurn } from "./types";

// what state does our game need?
type GameStateType = {
  playerTurn: PlayerTurn;
};

function App() {
  // all of our state will live at the App level
  // and we'll pass it down as props to the child components
  const [{ playerTurn }, setState] = useState<GameStateType>({
    playerTurn: "X",
  });
  // TODO pass setState or a function that uses setState internally
  // TODO onClick of a grid position, put an X or O in that position
  const [winner, setWinner] = useState<null | "X" | "O">(null);

  return (
    <div className="App">
      <Grid
        playerTurn={playerTurn}
        winner={winner}
        setWinner={setWinner}
        goToNextTurn={() => {
          // playerTurn starts at 1, then go to 2, then back to 1, etc

          // let nextTurn: any = null;
          // if (playerTurn === 1) {
          //   nextTurn = 2;
          // } else {
          //   nextTurn = 1;
          // }
          const nextTurn = playerTurn === "X" ? "O" : "X";

          // set to prev state, but override playerTurn
          setState((prev) => ({ ...prev, playerTurn: nextTurn }));
        }}
      />
      <GameInfo playerTurn={playerTurn} winner={winner} />
    </div>
  );
}

export default App;
