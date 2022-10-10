import React from 'react';
import { Provider } from 'react-redux';
import { GlobalStyle } from './styles';
import { Router } from './router';
import { store } from './store';

export function App(): JSX.Element {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  );
}
