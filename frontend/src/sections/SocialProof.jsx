import { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import { Logo } from '../components/Logo'
import usePartnerStore from '../stores/usePartnerStore'
import { media } from '../styles/media'

const StyledSocialProof = styled.section`
  background: ${(props) => props.theme.colors.surface};
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;

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
  margin-left: ${(props) => props.theme.spacing.md};
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
  const { servedAtPartners, loading, error, fetchServedAtPartners } =
    usePartnerStore()
  const hasFetched = useRef(false)

  useEffect(() => {
    // ✅ ONLY fetch once, period
    if (!hasFetched.current) {
      console.log('🏢 SocialProof: Fetching partners (ONCE)')
      fetchServedAtPartners()
      hasFetched.current = true
    }
  }, []) // ✅ Empty dependency array - crucial!

  if (loading && servedAtPartners.length === 0) {
    return <div>Loading partners...</div>
  }

  if (error) {
    return <div>Error loading partners: {error}</div>
  }

  return (
    <StyledSocialProof>
      <Container>
        <SectionTitle>Served at</SectionTitle>
        <LogoTrack>
          <LogoGrid>
            {servedAtPartners.map((partner) => (
              <LogoItem key={partner._id}>
                <Logo
                  logo={partner.logo?.url}
                  name={partner.name}
                  alt={partner.logo?.alt || partner.name}
                />
              </LogoItem>
            ))}
          </LogoGrid>

          <LogoGrid>
            {servedAtPartners.map((partner) => (
              <LogoItem key={`${partner._id}-duplicate`}>
                <Logo
                  logo={partner.logo?.url}
                  name={partner.name}
                  alt={partner.logo?.alt || partner.name}
                />
              </LogoItem>
            ))}
          </LogoGrid>
        </LogoTrack>
      </Container>
    </StyledSocialProof>
  )
}
