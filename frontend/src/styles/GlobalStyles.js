//Purpose: CSS reset using styled-components, overrides browser defaults

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* Remove default styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Base typography */
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: ${({ theme }) => theme.fonts.weights.normal};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Heading styles */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: ${(props) => props.theme.fonts.weights.bold};
    line-height: 1.2;
    margin: 0;
  }

  h1 {
    font-weight: ${(props) => props.theme.fonts.weights.heavy};
  }

  /* Body text */
  p, span, div {
    font-family: ${(props) => props.theme.fonts.body};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: none;
  }

  a.active,
  a[aria-current="page"] {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  ::selection {
  background: ${({ theme }) => theme.colors.brand.sky};
  color: ${({ theme }) => theme.colors.text.primary};
}

/* strong focus ring for accessibility */
:focus-visible {
  outline: 3px solid ${({ theme }) => theme.colors.primary};
  outline-offset: 2px;
}

  /* Button reset */
  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  /* Image optimization */
  img {
    max-width: 100%;
    height: auto;
  }
`

export default GlobalStyles
