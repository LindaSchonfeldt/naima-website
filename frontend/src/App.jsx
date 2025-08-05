import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import { Nav } from './components/Nav'
import Home from './pages/Home'
import FindUs from './pages/FindUs'
import OurStory from './pages/OurStory'
import ContactUs from './pages/ContactUs'
import RetreatClub from './pages/RetreatClub'

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/findus' element={<FindUs />} />
        <Route path='/ourstory' element={<OurStory />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/retreatclub' element={<RetreatClub />} />
      </Routes>
    </Router>
  )
}

export default App
