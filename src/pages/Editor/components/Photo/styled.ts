import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled(NavLink)`
  width: 166px;
  height: 166px;
  transition: all 0.3s ease-in;
  background-image: url(${({ src }: { src: string }) => src});
  background-size: cover;
  background-position: center center;
  filter: grayscale(1);

  &:hover {
    filter: grayscale(0);
  }
`;
