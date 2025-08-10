import styled, { keyframes } from 'styled-components'
import { companyLogos } from '../data/companyLogos'
import { Logo } from '../components/Logo'
import { media } from '../styles/media'

const StyledSocialProof = styled.section`
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.sm} 0;
  width: 100%;
  overflow: hidden;

  ${media.md} {
    padding: ${(props) => props.theme.spacing.md} 0;
  }
`

const Container = styled.div`
  width: 100%;
  margin: 0;
`

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  text-align: left;
  color: ${(props) => props.theme.colors.text.secondary};
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: ${(props) => props.theme.fonts.weights.normal};
  margin-left: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  text-transform: lowercase;
  letter-spacing: 2px;

  ${media.md} {
    font-size: 1.5rem;
    margin-left: ${(props) => props.theme.spacing.md};
  }
`

// Rolling animation keyframes
const roll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Move by half width to create seamless loop */
  }
`

const LogoTrack = styled.div`
  display: flex;
  width: 200%;
  animation: ${roll} 20s linear infinite; /* Adjust speed as needed */

  &:hover {
    animation-play-state: paused; /* Pause on hover */
  }
`

const LogoGrid = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-around;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xxl};
  padding: 0 ${(props) => props.theme.spacing.xl};
`

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
  min-width: 120px;

  &:hover {
    opacity: 1;
  }
`

export const SocialProof = () => {
  return (
    <StyledSocialProof>
      <Container>
        <SectionTitle>Served at</SectionTitle>
        <LogoTrack>
          <LogoGrid>
            {companyLogos.map((company) => (
              <LogoItem key={company.id}>
                <Logo src={company.logo} alt={company.alt}>
                  {company.name}
                </Logo>
              </LogoItem>
            ))}
          </LogoGrid>

          {/* Duplicate for seamless loop */}
          <LogoGrid>
            {companyLogos.map((company) => (
              <LogoItem key={`${company.id}-duplicate`}>
                <Logo src={company.logo} alt={company.alt}>
                  {company.name}
                </Logo>
              </LogoItem>
            ))}
          </LogoGrid>
        </LogoTrack>
      </Container>
    </StyledSocialProof>
  )
}
