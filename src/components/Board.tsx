import { useCallback, useContext, useEffect, useRef } from "react";

import { Tile as TileProps } from "./types";
import Tile from "./Tile";
import { GameContext } from "@/context/game-context";
import {
  GRID_SIZE,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
} from "@/constants";

import { BoardContainer, Cell, Grid, TilesContainer } from "./Board.styled";

export default function Board() {
  const { getTiles, moveTiles, startGame } = useContext(GameContext);
  const initialized = useRef(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // disables page scrolling with keyboard arrows
      e.preventDefault();

      switch (e.code) {
        case "ArrowUp":
          moveTiles(MOVE_UP);
          break;
        case "ArrowDown":
          moveTiles(MOVE_DOWN);
          break;
        case "ArrowLeft":
          moveTiles(MOVE_LEFT);
          break;
        case "ArrowRight":
          moveTiles(MOVE_RIGHT);
          break;
      }
    },
    [moveTiles]
  );

  const renderGrid = () => {
    const cells: JSX.Element[] = [];
    const totalCellsCount = GRID_SIZE * GRID_SIZE;

    for (let index = 0; index < totalCellsCount; index += 1) {
      cells.push(<Cell key={index} />);
    }

    return cells;
  };

  const renderTiles = () => {
    return getTiles().map((tile: TileProps) => (
      <Tile key={`${tile.id}`} {...tile} />
    ));
  };

  useEffect(() => {
    if (initialized.current === false) {
      startGame();
      initialized.current = true;
    }
  }, [startGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <BoardContainer>
      <TilesContainer>{renderTiles()}</TilesContainer>
      <Grid>{renderGrid()}</Grid>
    </BoardContainer>
  );
}
