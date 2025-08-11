import { FaInstagram } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import styled from 'styled-components'

import { SectionTitle } from '../components/SectionTitle'
import { media } from '../styles/media'

// Define social media links
const socialLinks = [
  { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
  { icon: FaTiktok, url: 'https://tiktok.com', label: 'TikTok' },
  { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' }
]

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

const SocialIconsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.md};

  ${media.lg} {
    margin-top: 0;
  }
`

// ✅ Create styled React Icons
const SocialIconLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: ${(props) => props.theme.spacing.xs};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
    transform: scale(1.1);
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
            {/* ✅ Map over social links */}
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <SocialIconLink
                key={label}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
              >
                <Icon />
              </SocialIconLink>
            ))}
          </SocialIconsContainer>
        </FooterSection>
      </FooterContent>
    </StyledFooter>
  )
}
