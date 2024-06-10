import styled from "styled-components";

export const ScoreContainer = styled.div`
  background: ${({ theme }) => theme.secondaryBackground};
  border: ${({ theme }) =>
    `calc(${theme.pixelSize} * 0.5) solid ${theme.secondaryBackground}`};
  border-radius: ${({ theme }) => `calc(${theme.pixelSize} * 0.75)`};
  color: ${({ theme }) => theme.tileBackground};
  font-size: ${({ theme }) => `calc(${theme.pixelSize} * 1.5)`};
  line-height: ${({ theme }) => `calc(${theme.pixelSize} * 3)`};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;

  @media (min-width: 512px) {
    border: ${({ theme }) =>
      `calc(${theme.pixelSize} * 1) solid ${theme.secondaryBackground}`};
    font-size: ${({ theme }) => `calc(${theme.pixelSize} * 2)`};
    line-height: ${({ theme }) => `calc(${theme.pixelSize} * 3.5)`};
  }
`;

export const ScoreValue = styled.div`
  font-size: ${({ theme }) => `calc(${theme.pixelSize} * 2.5)`};
  color: ${({ theme }) => theme.secondaryTextColor};

  @media (min-width: 512px) {
    font-size: ${({ theme }) => `calc(${theme.pixelSize} * 3.5)`};
  }
`;
