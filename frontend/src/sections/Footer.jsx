import styled from 'styled-components'

import { SectionTitle } from '../components/SectionTitle'
import { SocialIcon } from '../components/SocialIcon'
import { media } from '../styles/media'

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.md};
  margin-top: auto; /* Push footer to bottom */
  min-height: auto; /* Allow footer to grow based on content */
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

const SocialIconsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.md};

  ${media.lg} {
    margin-top: 0;
  }
`

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterSection>
          <SectionTitle align='left'>Join the community</SectionTitle>
          <p>© 2025 Naima. All rights reserved.</p>
        </FooterSection>
        <FooterSection></FooterSection>
        <FooterSection>
          <SocialIconsContainer>
            <SocialIcon icon='/icons/facebook.svg' url='https://facebook.com' />
            <SocialIcon
              icon='/icons/instagram.svg'
              url='https://instagram.com'
            />
            <SocialIcon icon='/icons/twitter.svg' url='https://twitter.com' />
          </SocialIconsContainer>
        </FooterSection>
      </FooterContent>
    </StyledFooter>
  )
}
