import styled from 'styled-components'
import { media } from '../styles/media'
import { SectionTitle } from '../components/SectionTitle'

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 50vh; /* Changed from height to min-height */
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  text-align: left;
  padding: ${(props) => props.theme.spacing.lg};
  margin-top: auto; /* Push footer to bottom */

  ${media.md} {
    padding: ${(props) => props.theme.spacing.xl};
    min-height: 25vh; /* Slightly taller on larger screens */
  }

  ${media.lg} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 20vh;
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  ${media.lg} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const FooterSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};

  ${media.lg} {
    margin-bottom: 0;
  }
`

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterSection>
          <SectionTitle align='left'>Join the community</SectionTitle>
        </FooterSection>
        <FooterSection>
          <p>© 2025 Naima.</p>
          <p>All rights reserved.</p>
        </FooterSection>
      </FooterContent>
    </StyledFooter>
  )
}
