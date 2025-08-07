//Purpose: CSS reset using styled-components, overrides browser defaults

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${(props) => props.theme.fonts.primary};
    font-weight: ${(props) => props.theme.fonts.weights.normal};
    line-height: 1.5;
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.background};
  }
`

export default GlobalStyles
