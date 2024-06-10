import Board from "./components/Board";
import Score from "./components/Score";
import GameProvider from "./context/game-context";

function App() {
  return (
    <GameProvider>
      <Score />
      <Board />
    </GameProvider>
  );
}

export default App;
