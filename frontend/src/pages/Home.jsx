import { Hero } from '../sections/Hero'
import { InstagramGrid } from '../sections/InstagramGrid'
import { SocialProof } from '../sections/SocialProof'

const Home = () => {
  return (
    <>
      {/* Full-width, no container */}
      <Hero />
      <SocialProof />
      {/* Content sections that need padding/max-width */}
      <InstagramGrid />
    </>
  )
}

export default Home
