import styled from 'styled-components';

export const StyledSidebar = styled.div`
  width: 200px;
  min-height: 100vh;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;

  > a:not(:last-child) {
    margin-bottom: 8px;
  }
`;
