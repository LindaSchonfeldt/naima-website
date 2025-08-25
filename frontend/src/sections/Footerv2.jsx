import styled from 'styled-components'

import { SocialIcons } from '../components/SocialIcons'
import { media } from '../styles/media'

const StyledFooter = styled.footer`
  position: relative;
  margin-top: auto;
  text-align: left;
  color: #fff; /* white content over image */
  min-height: 260px;

  /* full-bleed background image */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/footer-vert.jpg');
    background-size: cover;
    background-position: 70% 62%; /* tune like Option A */
    background-repeat: no-repeat;
    z-index: 0;
  }

  /* overlay for legibility */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.55) 0%,
      rgba(0,0,0,0.40) 40%,
      rgba(0,0,0,0.25) 100%
    );
    z-index: 0;
  }

  /* content spacing */
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  ${media.md} { padding: ${({ theme }) => theme.spacing.xxl}; }

  /* responsive crop nudges */
  @media (max-width: 480px) {
    &::before { background-position: 65% 60%; }
  }
  ${media.lg} {
    &::before { background-position: 75% 55%; }
  }
`

const FooterContent = styled.div`
  position: relative; z-index: 1; /* above image/overlay */
  margin: 0 auto; width: 100%;

  ${media.lg} {
    display: flex; justify-content: space-between; align-items: center;
  }
`

const FooterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  ${media.lg} { margin-bottom: 0; }

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fonts.weights.heavy};
    text-transform: lowercase;
    color: #fff;
  }
  p { color: rgba(255,255,255,0.92); }
`


export const Footer = () => {
  return (
    <StyledFooter style={{ '--bg-pos': 'right 40%' }}>
      <FooterContent>
        <FooterSection>
          <h2>join the community</h2>
          <p>© 2025 naima. All rights reserved.</p>
        </FooterSection>

        <FooterSection />

        <FooterSection style={{ color: '#fff' }}>
          <SocialIcons />
        </FooterSection>
      </FooterContent>
    </StyledFooter>
  )
}
