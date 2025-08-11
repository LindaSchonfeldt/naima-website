import { FeaturedFika } from '../sections/FeaturedFika'
import { Hero } from '../sections/Hero'
import { InstagramGrid } from '../sections/InstagramGrid'
import { SocialProof } from '../sections/SocialProof'

const Home = () => {
  return (
    <>
      {/* Full-width, no container */}
      <Hero />
      <SocialProof />
      <FeaturedFika />
      <InstagramGrid />
    </>
  )
}

export default Home
