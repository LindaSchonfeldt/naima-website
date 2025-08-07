import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Nav } from './components/Nav'
import ContactUs from './pages/ContactUs'
import FindUs from './pages/FindUs'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import RetreatClub from './pages/RetreatClub'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/findus' element={<FindUs />} />
          <Route path='/ourstory' element={<OurStory />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/retreatclub' element={<RetreatClub />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
