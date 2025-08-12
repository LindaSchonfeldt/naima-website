import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

// import ErrorBoundary from './components/ErrorBoundary' // ❌ Temporarily disable
import { Nav } from './components/Nav'
import ContactUs from './pages/ContactUs'
import FindUs from './pages/FindUs'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import RetreatClub from './pages/RetreatClub'
import Shop from './pages/Shop'
import { Footer } from './sections/Footer'
// import GlobalStyles from './styles/GlobalStyles' // ❌ Temporarily disable
import theme from './styles/theme'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <GlobalStyles /> */} {/* ❌ Temporarily disable */}
      <Router>
        {/* <ErrorBoundary> */} {/* ❌ Temporarily disable */}
        <AppContainer>
          <Nav />
          <MainContent>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/findus' element={<FindUs />} />
              <Route path='/ourstory' element={<OurStory />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/retreatclub' element={<RetreatClub />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
        {/* </ErrorBoundary> */} {/* ❌ Temporarily disable */}
      </Router>
    </ThemeProvider>
  )
}

export default App
