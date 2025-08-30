import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'

import Benefits from '../sections/Benefits'
import { Hero } from '../sections/Hero'
import { InstagramGrid } from '../sections/InstagramGrid'
import { SocialProof } from '../sections/SocialProof'
import { useUiStore } from '../stores/useUiStore'

const Home = () => {
  const startLoading = useUiStore((s) => s.startLoading)
  const stopLoading = useUiStore((s) => s.stopLoading)
  const loading = useUiStore((s) => (s.loadingCounters?.home || 0) > 0)

  useEffect(() => {
    startLoading('home')
    const t = setTimeout(() => stopLoading('home'), 800)
    return () => {
      clearTimeout(t)
      stopLoading('home')
    }
  }, [startLoading, stopLoading])

  if (loading) {
    return (
      <div>
        <Skeleton height={320} />
        <div style={{ marginTop: 16 }}>
          <Skeleton count={3} height={20} />
        </div>
      </div>
    )
  }

  // when not loading, render the normal Home UI
  return (
    <>
      <Hero />
      <SocialProof />
      <Benefits id='main' tabIndex={-1} />
      <InstagramGrid />
    </>
  )
}

export default Home
