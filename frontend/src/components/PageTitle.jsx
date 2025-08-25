import styled from 'styled-components'

import { media } from '../styles/media'

const StyledPageTitle = styled.h1`
  font-family: ${(props) => props.theme.typography.heading.fontFamily};
  font-weight: ${(props) => props.theme.typography.heading.fontWeight};
  line-height: ${(props) => props.theme.typography.heading.lineHeight};
  color: inherit;
  margin-bottom: ${(props) => props.theme.spacing.md};
  text-align: left; /* Always align left */
  font-size: 2rem;
  padding: 0;

  ${media.md} {
    font-size: 2rem;
  }

  ${media.lg} {
    font-size: 3rem;
  }
`

export const PageTitle = ({ children }) => {
  return <StyledPageTitle>{children}</StyledPageTitle>
}
