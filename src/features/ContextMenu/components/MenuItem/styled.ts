import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 16px;
  background-color: #ffffff;
  transition: all 0.3s ease-in;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &:hover {
     background-color: #DFE6E9;
  }
`;

export const IconWrap = styled.div`
  margin-right: 8px;
`;

export const Title = styled.p`
  color: #2D3436;
`;
