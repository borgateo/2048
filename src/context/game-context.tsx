import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { isNil, throttle, random } from "lodash";
import { mergeAnimationDuration, GRID_SIZE } from "@/constants";
import { Tile } from "@/components/types";
import gameReducer, { ActionType, initialState } from "@/reducers/game-reducer";
import { randomizeTile } from "@/utils/randomize-tile";

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
    const occupiedPositions = new Set<string>();
    const [firstX, firstY] = randomizeTile(0, GRID_SIZE - 1, occupiedPositions);
    occupiedPositions.add(`${firstX},${firstY}`);

    const [secondX, secondY] = randomizeTile(
      0,
      GRID_SIZE - 1,
      occupiedPositions
    );
    occupiedPositions.add(`${secondX},${secondY}`);
    dispatch({
      type: ActionType.CREATE_TILE,
      tile: { position: [firstX, firstY], value: 2 },
    });
    dispatch({
      type: ActionType.CREATE_TILE,
      tile: { position: [secondX, secondY], value: 2 },
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
