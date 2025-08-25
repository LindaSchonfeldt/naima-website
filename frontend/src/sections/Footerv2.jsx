import styled from 'styled-components'

import { SocialIcons } from '../components/SocialIcons'
import { media } from '../styles/media'

const StyledFooter = styled.footer`
  position: relative;
  margin-top: auto;
  text-align: left;

  /* content area stays on brand mint */
  background-color: ${({ theme }) => theme.colors.brand.primary};
  color: #111;

  /* === Banner strip config (taller for vertical image) === */
  --banner-h: clamp(140px, 24vw, 260px); /* was ~96–110px */
  --bg-x: 70%;           /* tune these two to move the crop */
  --bg-y: 72%;
  --fade-h: 24px;

  padding-top: calc(var(--banner-h) + ${({ theme }) => theme.spacing.lg});
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  padding-inline: ${({ theme }) => theme.spacing.md};

  /* Image strip */
  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;      /* top strip only */
    height: var(--banner-h);
    background-image: url('/images/footer-vert.jpg'); /* ensure this lives in /public/images */
    background-size: cover;
    background-position: var(--bg-x) var(--bg-y);
    background-repeat: no-repeat;
    z-index: 0;
    pointer-events: none;
  }

  /* fade where strip meets mint */
  &::after {
    content: '';
    position: absolute;
    inset: var(--banner-h) 0 auto 0;
    height: var(--fade-h);
    background: linear-gradient(to bottom, rgba(0,0,0,0.28), rgba(0,0,0,0));
    z-index: 0;
    pointer-events: none;
  }

  /* tweak crop by breakpoint */
  @media (max-width: 480px) {
    --bg-x: 65%;
    --bg-y: 60%;
  }
  ${media.md} {
    padding-inline: ${({ theme }) => theme.spacing.xl};
    --bg-x: 72%;
    --bg-y: 71%;
  }
  ${media.lg} {
    --bg-x: 75%;
    --bg-y: 71%;
  }
`

const FooterContent = styled.div`
  position: relative;
  z-index: 1; /* above strip/overlay */
  margin: 0 auto;
  width: 100%;

  ${media.lg} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const FooterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fonts.weights.heavy};
    text-transform: lowercase;
    color: #111;         
  }

  p { color: #111; opacity: 0.9; }

  ${media.lg} { margin-bottom: 0; }
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
