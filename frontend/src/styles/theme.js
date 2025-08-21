//Purpose: Centralized design tokens, accessible via props.theme
//Maintainability: Change theme.js to update entire app

const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#e2e8f0',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      muted: '#94a3b8',
      hero: '#ffffff'
    },
    error: '#ef4444',
    success: '#10b981',

    // 👇 client palette
    brand: {
      primary: '#BCE8C2', // CTA, active states
      blush: '#F7CDD0', // soft highlight/hero band
      salmon: '#F4A6A3', // info tint, tags
      lavender: '#D0C3F1', // secondary tint, cards
      sky: '#B3D9F3' // success tint / positive
    }
  },
  fonts: {
    // Semantic font naming
    heading: "'Arca Majora', sans-serif", // For h1, h2, h3, etc.
    body: "'Neuzeit S LT Std', sans-serif", // For paragraphs, text

    // Alternative: Keep primary/secondary but assign semantically
    primary: "'Arca Majora', sans-serif", // Headings
    secondary: "'Neuzeit S LT Std', sans-serif", // Body text

    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 900 // For Arca Majora Heavy
    }
  },
  typography: {
    // Define typography scales
    heading: {
      fontFamily: "'Arca Majora', sans-serif",
      fontWeight: 700,
      lineHeight: 1.2
    },
    body: {
      fontFamily: "'Neuzeit S LT Std', sans-serif",
      fontWeight: 400,
      lineHeight: 1.6
    },
    caption: {
      fontFamily: "'Neuzeit S LT Std', sans-serif",
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.4
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 900, // heavy weight
      lineHeight: 1.2
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.2
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
