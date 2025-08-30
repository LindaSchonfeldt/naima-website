import React, { Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'

import Benefits from '../sections/Benefits'
import { Hero } from '../sections/Hero'
import InstagramGrid from '../sections/InstagramGrid'
import { SocialProof } from '../sections/SocialProof'

const Home = () => {
  return (
    <>
      <Hero />
      <SocialProof />
      <Benefits id='main' tabIndex={-1} />
      <Suspense fallback={<Skeleton height={300} />}>
        <InstagramGrid />
      </Suspense>
    </>
  )
}

export default Home
