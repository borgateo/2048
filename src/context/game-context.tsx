import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { isNil, throttle } from "lodash";
import { mergeAnimationDuration, GRID_SIZE } from "@/constants";
import { Tile } from "@/components/types";
import gameReducer, { ActionType, initialState } from "@/reducers/game-reducer";

export const GameContext = createContext({
  score: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveTiles: (_: ActionType) => {},
  getTiles: () => [] as Tile[],
  startGame: () => {},
  resetGame: () => {},
});

export default function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const getTiles = () => {
    return gameState.tilesByIds.map((tileId) => gameState.tiles[tileId]);
  };

  const moveTiles = useCallback(
    throttle(
      (type: ActionType) => dispatch({ type }),
      mergeAnimationDuration * 1.05,
      { trailing: false }
    ),
    [dispatch]
  );

  const startGame = () => {
    dispatch({
      type: ActionType.CREATE_TILE,
      tile: { position: [0, 1], value: 2 },
    });
    dispatch({
      type: ActionType.CREATE_TILE,
      tile: { position: [0, 2], value: 2 },
    });
  };

  const resetGame = () => {
    dispatch({ type: ActionType.RESET_GAME });
  };
  useEffect(() => {
    const getEmptyCells = () => {
      const results: [number, number][] = [];

      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          if (isNil(gameState.board[y][x])) {
            results.push([x, y]);
          }
        }
      }
      return results;
    };

    const appendRandomTile = () => {
      const emptyCells = getEmptyCells();
      if (emptyCells.length > 0) {
        const cellIndex = Math.floor(Math.random() * emptyCells.length);
        const newTile = {
          position: emptyCells[cellIndex],
          value: 2,
        };
        dispatch({ type: ActionType.CREATE_TILE, tile: newTile });
      }
    };

    if (gameState.hasChanged) {
      setTimeout(() => {
        dispatch({ type: ActionType.CLEAN_UP });
        appendRandomTile();
      }, mergeAnimationDuration);
    }
  }, [gameState.hasChanged, gameState.board]);

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        getTiles,
        moveTiles,
        startGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
