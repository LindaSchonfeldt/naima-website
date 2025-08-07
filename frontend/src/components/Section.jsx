// components/Section.jsx
import styled from 'styled-components'

import { media } from '../styles/media'

const StyledSection = styled.section`
  padding: ${(props) => props.theme.spacing.xxl} ${(props) => props.theme.spacing.xl};

  ${media.md} {
    padding: 6rem ${(props) => props.theme.spacing.xxl};
  }

  ${(props) =>
    props.fullHeight &&
    `
    min-height: 100vh;
    display: flex;
    align-items: center;
  `}

  ${(props) =>
    props.background &&
    `
    background: ${props.background};
  `}
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

export const Section = ({ children, fullHeight, background, className }) => {
  return (
    <StyledSection
      fullHeight={fullHeight}
      background={background}
      className={className}
    >
      <Container>{children}</Container>
    </StyledSection>
  )
}
