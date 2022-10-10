import styled from 'styled-components';

type Props = {
  x: number;
  y: number;
};

export const Container = styled.div<Props>`
  position: absolute;
  width: 250px;
  max-height: 500px;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};;
  background: #ffffff;
  border: 1px solid #DFE6E9;
  border-radius: 8px;
`;
