//Purpose: Centralized design tokens, accessible via props.theme
//Maintainability: Change theme.js to update entire app

const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    background: '#ffffff',
    surface: '#f8fafc',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      muted: '#94a3b8',
      hero: '#ffffff'
    },
    border: '#e2e8f0',
    error: '#ef4444',
    success: '#10b981'
  },
  fonts: {
    primary: "'Arial', sans-serif",
    secondary: "'Inter', sans-serif",
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  breakpoints: {
    xs: '320px', // Extra small phones
    sm: '576px', // Small phones (landscape)
    md: '768px', // Tablets (portrait)
    lg: '992px', // Tablets (landscape) / Small laptops
    xl: '1200px', // Desktop
    xxl: '1400px', // Large desktop
    xxxl: '1920px' // Extra large desktop
  },
  layout: {
    navHeight: '80px',
    heroHeight: 'calc(100vh - 80px)'
  }
}

export default theme
