import styled from 'styled-components';

type CanvasWrapperProps = {
  isCtrlPressed: boolean;
};

export const CanvasWrapper = styled.div<CanvasWrapperProps>`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ isCtrlPressed }) => (isCtrlPressed ? 'grab' : 'auto')};
  
  > div {
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  }
`;
