import styled, { keyframes } from 'styled-components'
import { media } from '../styles/media'
import { companyLogos } from '../data/companyLogos'

const SocialProofSection = styled.section`
  background: ${(props) => props.theme.colors.surface};
  padding: 1rem 0;
  width: 100%;
  overflow: hidden; /* Hide logos that move outside */
`

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: ${(props) => props.theme.fonts.weights.normal};
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  width: calc(200% + 4rem); /* Double width for seamless loop */
  animation: ${roll} 10s linear infinite; /* Adjust speed as needed */

  &:hover {
    animation-play-state: paused; /* Pause on hover */
  }
`

const LogoGrid = styled.div`
  display: flex;
  width: 50%; /* Half of track width */
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;

  /* Duplicate the logos for seamless loop */
  &:first-child {
    margin-right: 2rem;
  }
`

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  filter: grayscale(100%);
  flex-shrink: 0; /* Prevent shrinking */
  min-width: 120px;

  &:hover {
    opacity: 1;
    filter: grayscale(0%);
  }

  img {
    max-width: 120px;
    max-height: 60px;
    width: auto;
    height: auto;
    object-fit: contain;
  }
`

export const SocialProof = () => {
  return (
    <SocialProofSection>
      <Container>
        <SectionTitle>Served at</SectionTitle>
        <LogoTrack>
          {/* First set of logos */}
          <LogoGrid>
            {companyLogos.map((company) => (
              <LogoItem key={company.id}>
                <img src={company.logo} alt={company.alt} loading='lazy' />
              </LogoItem>
            ))}
          </LogoGrid>

          {/* Duplicate set for seamless loop */}
          <LogoGrid>
            {companyLogos.map((company) => (
              <LogoItem key={`${company.id}-duplicate`}>
                <img src={company.logo} alt={company.alt} loading='lazy' />
              </LogoItem>
            ))}
          </LogoGrid>
        </LogoTrack>
      </Container>
    </SocialProofSection>
  )
}
