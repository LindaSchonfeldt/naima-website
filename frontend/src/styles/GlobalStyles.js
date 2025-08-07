//Purpose: CSS reset using styled-components, overrides browser defaults

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* Base typography */
  body {
    font-family: ${(props) => props.theme.fonts.body};
    font-weight: ${(props) => props.theme.fonts.weights.normal};
    line-height: 1.6;
  }

  /* Heading styles */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: ${(props) => props.theme.fonts.weights.bold};
    line-height: 1.2;
    margin: 0;
  }

  h1 {
    font-weight: ${(props) =>
      props.theme.fonts.weights.heavy}; /* Use Heavy for h1 */
  }

  /* Body text */
  p, span, div {
    font-family: ${(props) => props.theme.fonts.body};
  }

  /* Remove default styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

export default GlobalStyles
