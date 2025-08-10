import styled from 'styled-components'

import { media } from '../styles/media'

const StyledSectionTitle = styled.h2`
  font-family: ${(props) => props.theme.typography.heading.fontFamily};
  font-weight: ${(props) => props.theme.typography.heading.fontWeight};
  line-height: ${(props) => props.theme.typography.heading.lineHeight};
  color: inherit;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  text-align: ${(props) =>
    props.$align || 'left'}; /* Use $align instead of align */
  font-size: 1.5rem;

  ${media.md} {
    font-size: 2rem;
  }

  ${media.lg} {
    font-size: 2.5rem;
  }
`

export const SectionTitle = ({ children, align }) => {
  return <StyledSectionTitle $align={align}>{children}</StyledSectionTitle>
}
