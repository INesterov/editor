import React from 'react';
import { Container, IconWrap, Title } from './styled';

type Props = {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
};

export function MenuItem(props: Props): JSX.Element {
  const { icon, title, onClick } = props;

  return (
    <Container onClick={onClick}>
      <IconWrap>
        {icon}
      </IconWrap>
      <Title>{title}</Title>
    </Container>
  );
}
