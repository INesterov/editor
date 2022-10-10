import styled from 'styled-components';

type ContainerProps = {
  isLoading: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 164px;
  height: 164px;
  background: #F0F2F5;
  border: 1px dashed #DCDCDC;
  cursor: pointer;
  transition: all 0.3s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #DCDCDC;
  position: relative;
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};

  &:hover {
    border: 1px dashed #0052D9;
    color: #0052D9;
  }
`;

export const FileInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;
