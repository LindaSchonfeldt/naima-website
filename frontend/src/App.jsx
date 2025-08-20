import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

// import ErrorBoundary from './components/ErrorBoundary' // ❌ Temporarily disable
import { Nav } from './components/Nav'
import { ProtectedRoute } from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import ColorDemo from './pages/ColorDemo'
import CompanyPortal from './pages/CompanyPortal'
import CompanyProfile from './pages/CompanyProfile'
import ContactUs from './pages/ContactUs'
import FindUs from './pages/FindUs'
import Home from './pages/Home'
import { Login } from './pages/Login'
import OurStory from './pages/OurStory'
import ReTreatClub from './pages/ReTreatClub'
import Shop from './pages/Shop'
import { Footer } from './sections/Footer'
import GlobalStyles from './styles/GlobalStyles'
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
      <GlobalStyles />
      <Router>
        {/* <ErrorBoundary> */} {/* ❌ Temporarily disable */}
        <AppContainer>
          <Nav />
          <MainContent>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/colordemo' element={<ColorDemo />} />
              {/* colordemo site to preview new color palette from client*/}
              <Route path='/findus' element={<FindUs />} />
              <Route path='/ourstory' element={<OurStory />} />
              <Route path='/retreatclub' element={<ReTreatClub />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/company' element={<CompanyPortal />} />
              <Route path='/login' element={<Login />} />
              <Route
                path='/shop'
                element={
                  <ProtectedRoute>
                    <Shop />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <CompanyProfile />
                  </ProtectedRoute>
                }
              />
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
