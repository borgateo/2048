import styled from "styled-components";

export const ScoreContainer = styled.div`
  box-shadow: ${({ theme }) => theme.backgrounds.glare};
  background: ${({ theme }) => theme.backgrounds.secondary};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primaryText};
  font-size: 12px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  padding: 4px;
  width: 80px;
  margin: 10px auto;

  @media (min-width: 512px) {
    font-size: 16px;
    line-height: 28px;
    padding: 8px;
    width: 125px;
  }
`;

export const ScoreValue = styled.div`
  font-size: 20px;

  @media (min-width: 512px) {
    font-size: 28px;
  }
`;
