import { FeaturedFika } from '../sections/FeaturedFika'
import { Hero } from '../sections/Hero'
import { InstagramGrid } from '../sections/InstagramGrid'
import { SocialProof } from '../sections/SocialProof'

const Home = () => {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedFika id="main" tabIndex={-1}/>
      <InstagramGrid />
    </>
  )
}

export default Home
