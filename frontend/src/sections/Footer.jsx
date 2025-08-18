import styled from 'styled-components'

import { PageTitle } from '../components/PageTitle'
import { SocialIcons } from '../components/SocialIcons'
import { media } from '../styles/media'

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.md};
  margin-top: auto;
  min-height: auto;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  text-align: left;

  ${media.md} {
    padding: ${(props) => props.theme.spacing.xl};
    min-height: auto;
  }

  ${media.lg} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: auto;
  }
`

const FooterContent = styled.div`
  margin: 0 auto;
  width: 100%;

  ${media.lg} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const FooterSection = styled.div`
  justify-content: flex-start;
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
          <PageTitle align='left'>Join the community</PageTitle>
          <p>© 2025 Naima. All rights reserved.</p>
        </FooterSection>
        <FooterSection></FooterSection>
        <FooterSection>
          <SocialIcons />
        </FooterSection>
      </FooterContent>
    </StyledFooter>
  )
}
