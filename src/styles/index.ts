import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  // You can continue writing global styles here
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #FAFAFA;
  }

  h1, h2, h3, h4, h5, a, p {
    padding: 0;
    margin: 0;
  }
`;
