//Purpose: CSS reset using styled-components, overrides browser defaults

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* Remove default styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
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

  a.link-underline {
  position: relative;
  text-decoration: none;
  }
  
  a.link-underline::after {
    content: '';
    position: absolute; left: 0; bottom: -2px;
    width: 100%; height: 2px;
    background: ${({ theme }) => theme.colors.brand.primary};
    transform: scaleX(0); transform-origin: left;
    transition: transform 180ms ease;
  }
  a.link-underline:hover::after,
  a.link-underline:focus-visible::after { transform: scaleX(1); }

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

  /* Motion safety */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }

  @font-face {
  font-family: 'Neuzeit';
  src: url('/fonts/neuzeit_s_lt_std_book.woff2') format('woff2'),
       url('/fonts/neuzeit_s_lt_std_book.woff') format('woff');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap; /* show fallback text immediately, swap in webfont */
}
`

export default GlobalStyles
