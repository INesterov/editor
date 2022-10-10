import React from 'react';
import { Container } from './styled';

type Props = {
  id: string;
  src: string;
};

export function Photo(props: Props): JSX.Element {
  const { id, src } = props;

  return (
    <Container to={`/${id}`} src={src} />
  );
}
