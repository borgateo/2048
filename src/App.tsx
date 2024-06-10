import Board from "./components/Board";
import Restart from "./components/Restart";
import Score from "./components/Score";
import GameProvider from "./context/gameContext";

function App() {
  return (
    <GameProvider>
      <Score />
      <Restart />
      <Board />
    </GameProvider>
  );
}

export default App;
