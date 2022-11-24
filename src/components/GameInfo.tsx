import { PlayerTurn } from "../types";

export function GameInfo({
  playerTurn,
  winner,
}: {
  playerTurn: PlayerTurn;
  winner: null | "X" | "O";
}) {
  return (
    <div>
      <div className="player-label">
        {/* if there's a winner, show the winner, */}
        {/* else show whose turn it is */}
        {winner ? (
          <div>Winner is {playerTurn}</div>
        ) : playerTurn === "X" ? (
          <div>Your turn</div>
        ) : (
          <div> Robot's turn</div>
        )}
      </div>
    </div>
  );
}
