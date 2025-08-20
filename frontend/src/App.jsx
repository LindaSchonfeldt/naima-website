import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import { CompanyNav } from './components/CompanyNav'
// import ErrorBoundary from './components/ErrorBoundary' // ❌ Temporarily disable
import { Nav } from './components/Nav'
import { ProtectedRoute } from './components/ProtectedRoute'
import Checkout from './pages/Checkout'
import CompanyOrders from './pages/CompanyOrders'
import CompanyPortal from './pages/CompanyPortal'
import CompanyProfile from './pages/CompanyProfile'
import ContactUs from './pages/ContactUs'
import FindUs from './pages/FindUs'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import ReTreatClub from './pages/ReTreatClub'
import Shop from './pages/Shop'
import { Footer } from './sections/Footer'
import { useAuthStore } from './stores/useAuthStore'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'
import CompanyDashboard from './pages/CompanyDashboard'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
`

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        {/* <ErrorBoundary> */} {/* ❌ Temporarily disable */}
        <AppContainer>
          <Nav />
          {isLoggedIn && <CompanyNav />}{' '}
          {/* <-- Only visible to logged-in companies */}
          <MainContent>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/findus' element={<FindUs />} />
              <Route path='/ourstory' element={<OurStory />} />
              <Route path='/retreatclub' element={<ReTreatClub />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/company/login' element={<CompanyPortal />} />
              <Route
                path='/company'
                element={
                  <ProtectedRoute>
                    <CompanyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/company/profile'
                element={
                  <ProtectedRoute>
                    <CompanyProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/company/orders'
                element={
                  <ProtectedRoute>
                    <CompanyOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/company/shop'
                element={
                  <ProtectedRoute>
                    <Shop />
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
