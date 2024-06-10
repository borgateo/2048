import { useContext } from 'react';
import { GameContext } from '@/context/gameContext';
import { ScoreContainer, ScoreValue } from './Score.styled';

export default function Score() {
  const { score } = useContext(GameContext);

  return (
    <ScoreContainer>
      Score
      <ScoreValue>{score}</ScoreValue>
    </ScoreContainer>
  );
}
