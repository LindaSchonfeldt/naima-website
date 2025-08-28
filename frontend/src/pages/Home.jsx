import Benefits from '../sections/Benefits'
import { FeaturedFika } from '../sections/FeaturedFika'
import { Hero } from '../sections/Hero'
import { InstagramGrid } from '../sections/InstagramGrid'
import { SocialProof } from '../sections/SocialProof'

const Home = () => {
  return (
    <>
      <Hero />
      <SocialProof />
      <Benefits id="main" tabIndex={-1}/>
      {/* <FeaturedFika id="main" tabIndex={-1}/> */}
      <InstagramGrid />
    </>
  )
}

export default Home
