import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import { useEffect } from 'react'

import { CompanyNav } from './components/CompanyNav'
// import ErrorBoundary from './components/ErrorBoundary' // ❌ Temporarily disable
import { Nav } from './components/Nav'
import { ProtectedRoute } from './components/ProtectedRoute'
import CompanyCheckout from './pages/CompanyCheckout'
import CompanyDashboard from './pages/CompanyDashboard'
import CompanyOrders from './pages/CompanyOrders'
import CompanyPortal from './pages/CompanyPortal'
import CompanyProfile from './pages/CompanyProfile'
import ContactUs from './pages/ContactUs'
import FindUs from './pages/FindUs'
import Home from './pages/Home'
import CompanyOrderDetails from './pages/CompanyOrderDetails'
import OurStory from './pages/OurStory'
import Products from './pages/Products'
import ReTreatClub from './pages/ReTreatClub'
import Shop from './pages/Shop'
// import { Footer } from './sections/Footer'
import { Footer } from './sections/Footerv2'
import { useAuthStore } from './stores/useAuthStore'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'
import { api } from './services/api'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
`

function App() {
  const { company, companyToken, setAuth, setCompany } = useAuthStore()

  useEffect(() => {
    if (!company && companyToken) {
      ;(async () => {
        try {
          const profile = await api.companies.getProfile(companyToken)
          if (profile)
            setAuth ? setAuth(companyToken, profile) : setCompany?.(profile)
        } catch (err) {
          console.error('Failed to hydrate company profile on app start', err)
        }
      })()
    }
  }, [company, companyToken, setAuth, setCompany])

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const companyName = useAuthStore((state) => state.companyName)

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
              <Route path='/products' element={<Products />} />
              <Route path='/findus' element={<FindUs />} />
              <Route path='/ourstory' element={<OurStory />} />
              <Route path='/retreatclub' element={<ReTreatClub />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/company/login' element={<CompanyPortal />} />
              <Route
                path='/company/dashboard'
                element={
                  <ProtectedRoute>
                    <CompanyDashboard
                      token={companyToken}
                      companyName={companyName}
                    />
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
                path='/orders/:orderId'
                element={
                  <ProtectedRoute>
                    <CompanyOrderDetails />
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
              <Route
                path='/company/checkout'
                element={
                  <ProtectedRoute>
                    <CompanyCheckout />
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
