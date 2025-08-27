// src/sections/CateringPartners.jsx
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import usePartnerStore from '../stores/usePartnerStore'
import { media } from '../styles/media'

const Wrap = styled.section`
  width: min(1100px, 92vw);
  margin: 3rem auto 4rem;
`
const Heading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.heavy};
  font-size: clamp(1.25rem, 1rem + 1.2vw, 1.75rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  letter-spacing: .5px;
`
const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: repeat(1, minmax(0, 1fr));
  ${media.sm} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  ${media.md} { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  ${media.lg} { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`
const Card = styled.a`
  display: grid; place-items: center;
  min-height: 84px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  text-decoration: none;
  outline-offset: 3px;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
  &:hover { transform: translateY(-2px); }
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.brand.salmon};
    box-shadow: 0 6px 20px rgba(0,0,0,.08);
  }
`
const LogoBox = styled.div`
  width: 100%;
  max-width: 220px;
  aspect-ratio: 4 / 1.25;
  display: grid; place-items: center;
  overflow: hidden;
  img { max-width: 100%; max-height: 100%; display: block; }
`
const Badge = styled.div`
  display: grid; place-items: center;
  width: 100%; height: 100%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand.blush};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  letter-spacing: .4px; text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.sm};
`

// utils
const slug = (s='') =>
  s.toLowerCase().replace(/\s*&\s*/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')

const Logo = ({ name, remoteUrl }) => {
  const localSvg = `/partners/${slug(name)}.svg`
  const localPng = `/partners/${slug(name)}.png`

  // 👇 Start with remote if available, otherwise try the local SVG first
  const [src, setSrc] = useState(remoteUrl || localSvg)
  const [failed, setFailed] = useState(false)

  // Reset when name/remote changes (e.g., HMR or props update)
  useEffect(() => {
    setFailed(false)
    setSrc(remoteUrl || localSvg)
  }, [name, remoteUrl, localSvg])

  const onError = () => {
    // Try SVG → PNG → Badge
    if (src === remoteUrl && remoteUrl) {
      setSrc(localSvg)
    } else if (src === localSvg) {
      setSrc(localPng)
    } else {
      setFailed(true)
    }
  }

  if (failed || !src) return <Badge aria-hidden="true">{name}</Badge>

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={onError}
      referrerPolicy="no-referrer"
    />
  )
}

const CateringPartners = () => {
  const prefersReduced = useReducedMotion()
  const { cateringPartners, fetchCateringPartners, loading } = usePartnerStore()

  useEffect(() => {
    fetchCateringPartners?.().catch(() => {})
  }, [fetchCateringPartners])

  const list = useMemo(
    () => (Array.isArray(cateringPartners) ? cateringPartners : []),
    [cateringPartners]
  )

  return (
    <Wrap aria-labelledby="catering-title">
      <Heading id="catering-title">Order from our wholesale & catering partners: </Heading>

      <Grid
        as={motion.div}
        initial={prefersReduced ? false : 'hidden'}
        animate={prefersReduced ? undefined : 'show'}
        variants={{
          hidden: { opacity: 0, y: 6 },
          show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, when: 'beforeChildren' } }
        }}
      >
        {list.map((p) => (
          <motion.div
            key={p.id || p._id || p.name}
            variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
          >
            <Card
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${p.name}`}
              title={p.name}
            >
              <LogoBox>
                <Logo name={p.name} logo={p.logo} />
              </LogoBox>
            </Card>
          </motion.div>
        ))}
      </Grid>

      {loading && <p style={{ marginTop: 12, opacity: .7 }}>Loading…</p>}
      {!loading && list.length === 0 && <p style={{ opacity: .7 }}>No partners yet.</p>}
    </Wrap>
  )
}

export default CateringPartners
