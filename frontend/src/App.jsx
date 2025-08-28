import { useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import { CompanyNav } from './components/CompanyNav'
// import ErrorBoundary from './components/ErrorBoundary' // ❌ Temporarily disable
import { Nav } from './components/Nav'
import { ProtectedRoute } from './components/ProtectedRoute'
import SkipLink from './components/SkipLink'
import CompanyCheckout from './pages/CompanyCheckout'
import CompanyDashboard from './pages/CompanyDashboard'
import CompanyOrderDetails from './pages/CompanyOrderDetails'
import CompanyOrders from './pages/CompanyOrders'
import CompanyPortal from './pages/CompanyPortal'
import CompanyProfile from './pages/CompanyProfile'
import ContactUs from './pages/ContactUs'
import FindUs from './pages/FindUs'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Products from './pages/Products'
import Shop from './pages/Shop'
import { Footer } from './sections/Footerv2'
import { api } from './services/api'
import { useAuthStore } from './stores/useAuthStore'
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
  const location = useLocation()
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

  // Scroll to top on route change, with respect for reduced motion preferences
  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced ? 'auto' : 'smooth'
    })
  }, [location.pathname])

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const companyName = useAuthStore((state) => state.companyName)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <ErrorBoundary> */} {/* ❌ Temporarily disable */}
      <AppContainer>
        <SkipLink />
        <Nav />
        {isLoggedIn && <CompanyNav />}{' '}
        {/* <-- Only visible to logged-in companies */}
        <MainContent>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/findus' element={<FindUs />} />
            <Route path='/ourstory' element={<OurStory />} />
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
    </ThemeProvider>
  )
}

export default App
