import React, { useContext } from 'react';
import { GameContext } from '@/context/game-context';

import { Button } from './Restart.styled';

const Reset: React.FC = () => {
  const { resetGame, startGame } = useContext(GameContext);

  const handleClick = () => {
    resetGame();
    startGame();
  };

  return (
    <div>
      <Button onClick={handleClick}>Restart Game</Button>
    </div>
  );
};

export default Reset;
