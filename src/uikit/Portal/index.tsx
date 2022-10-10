import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function Portal(props: Props): JSX.Element {
  return createPortal(props.children, document.body);
}
