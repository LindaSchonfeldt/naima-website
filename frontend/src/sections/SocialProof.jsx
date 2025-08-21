import { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import { Logo } from '../components/Logo'
import usePartnerStore from '../stores/usePartnerStore'
import { media } from '../styles/media'

const StyledSocialProof = styled.section`
  background: ${({ theme }) => theme.colors.brand.blush};
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
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.normal};
  margin-left: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  text-transform: lowercase;
  letter-spacing: 2px;

  ${media.md} {
    font-size: 1.5rem;
    margin-left: ${({ theme }) => theme.spacing.md};
  }
`

// Rolling animation keyframes- Animate the track by the width of one list (half of the doubled content) */
const roll = keyframes`
  to { transform: translateX(-50%); }
`

const LogoTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${roll} 15s linear infinite; /* Adjust speed as needed */

  &:hover {
    animation-play-state: paused; /* Pause on hover */
  }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const LogoGrid = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  flex: 0 0 auto;
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
    if (!hasFetched.current) {
      fetchServedAtPartners()
      hasFetched.current = true
    }
  }, [])

  if (loading && servedAtPartners.length === 0)
    return <div>Loading partners...</div>
  if (error) return <div>Error loading partners: {error}</div>

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
          {/* Duplicate grid for animation */}
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
