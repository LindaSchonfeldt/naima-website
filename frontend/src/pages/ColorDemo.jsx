import React from "react";
import styled, { createGlobalStyle, css, ThemeProvider } from "styled-components";

/**
 * Single-file, drop-in demo of the client's palette.
 * - Self-contained ThemeProvider + GlobalStyles.
 * - No external project wiring required to preview.
 *
 * Usage in your app: render <BrandPaletteDemo /> on any route.
 */

const theme = {
  colors: {
    // neutrals (kept close to your existing)
    background: "#ffffff",
    surface: "#f8fafc",
    border: "#e2e8f0",
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      muted: "#94a3b8",
      hero: "#ffffff",
    },

    // client palette
    brand: {
      primary: "#F4A6A3", // CTA
      blush: "#F7CDD0", // highlight / hero band
      sky: "#B3D9F3", // info tint
      lavender: "#D0C3F1", // secondary tint
      mint: "#BCE8C2", // success tint
    },

    // text-on-color helpers
    on: {
      primary: "#1e293b",
      tint: "#1e293b",
    },

    semantic: {
      infoBg: "#B3D9F3",
      successBg: "#BCE8C2",
      highlightBg: "#F7CDD0",
    },
  },
  fonts: {
    heading: "'Arca Majora', system-ui, sans-serif",
    body: "'Neuzeit S LT Std', system-ui, sans-serif",
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 900,
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  breakpoints: {
    md: "768px",
  },
};

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body { margin:0; background:${({theme}) => theme.colors.background}; color:${({theme}) => theme.colors.text.primary}; font-family:${({theme}) => theme.fonts.body}; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
  h1,h2,h3,h4,h5,h6 { font-family:${({theme}) => theme.fonts.heading}; font-weight:${({theme}) => theme.fonts.weights.bold}; line-height:1.2; margin:0; }
  a { color:${({theme}) => theme.colors.brand.primary}; text-decoration:none; }
  ::selection { background:${({theme}) => theme.colors.brand.sky}; color:${({theme}) => theme.colors.on.tint}; }
  :focus-visible { outline:3px solid ${({theme}) => theme.colors.brand.sky}; outline-offset:2px; }
`;

// Layout wrappers
const Page = styled.main`
  width: min(1100px, 92vw);
  margin: 0 auto;
  padding: ${({theme}) => theme.spacing.xl} 0 ${({theme}) => theme.spacing.xxl};
  display: grid;
  gap: ${({theme}) => theme.spacing.xl};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({theme}) => theme.spacing.lg};
  @media (min-width: ${({theme}) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
  }
`;

// Buttons
const Button = styled.button`
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.75rem 1.25rem; border-radius: 9999px; border: 1px solid transparent;
  font-weight: ${({theme}) => theme.fonts.weights.semibold};
  transition: filter .15s ease, transform .02s ease; cursor: pointer;
  ${({ variant = 'primary', theme }) => {
    if (variant === 'outline') {
      return css`
        background: transparent; color: ${theme.colors.text.primary};
        border-color: ${theme.colors.brand.primary};
        &:hover { background: ${theme.colors.brand.blush}; }
      `;
    }
    if (variant === 'success') {
      return css`
        background: ${theme.colors.brand.mint}; color: ${theme.colors.on.tint};
        &:hover { filter: brightness(0.95); }
      `;
    }
    return css`
      background: ${theme.colors.brand.primary}; color: ${theme.colors.on.primary};
      &:hover { filter: brightness(0.95); }
      &:active { transform: translateY(1px); }
    `;
  }}
`;

// Surfaces
const Band = styled.section`
  background: ${({bg}) => bg};
  color: ${({theme}) => theme.colors.on.tint};
  padding: ${({theme}) => theme.spacing.xl} 0;
  border-top: 1px solid ${({theme}) => theme.colors.border};
  border-bottom: 1px solid ${({theme}) => theme.colors.border};
`;

const Card = styled.div`
  background: ${({bg, theme}) => bg ?? theme.colors.surface};
  color: ${({theme}) => theme.colors.on.tint};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 14px;
  padding: ${({theme}) => theme.spacing.lg};
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
`;

const Tag = styled.span`
  display: inline-block; border-radius: .5rem; padding: .3rem .6rem;
  background: ${({bg}) => bg}; color: ${({theme}) => theme.colors.on.tint};
  font-size: .85rem;
`;

const Gradient = styled.div`
  background: linear-gradient(180deg, ${({theme}) => theme.colors.brand.sky} 0%, ${({theme}) => theme.colors.brand.lavender} 100%);
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 14px; padding: ${({theme}) => theme.spacing.lg};
`;

const Swatches = styled.div`
  display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: ${({theme}) => theme.spacing.md};
  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0,1fr)); }
`;

const Swatch = styled.div`
  border: 1px solid ${({theme}) => theme.colors.border}; border-radius: 12px; overflow: hidden;
`;
const SwatchChip = styled.div`
  height: 88px; background: ${({color}) => color};
`;
const SwatchLabel = styled.div`
  padding: .6rem .75rem; display:flex; align-items:center; justify-content:space-between; gap:.5rem;
  color: ${({theme}) => theme.colors.text.primary}; background: ${({theme}) => theme.colors.background};
  font-size: .9rem;
`;

const SectionHeader = styled.h2`
  font-weight: ${({theme}) => theme.fonts.weights.heavy};
  letter-spacing: .02em; line-height: 1.05;
  font-size: clamp(1.75rem, 4.5vw, 3rem);
`;

const Stack = styled.div`
  display: grid; gap: ${({theme}) => theme.spacing.md};
`;

function ContentWidth({ children }) {
  return (
    <div style={{ width: "min(900px, 92vw)", margin: "0 auto" }}>{children}</div>
  );
}

export default function BrandPaletteDemo() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Page>
        <header>
          <h1 style={{ fontWeight: theme.fonts.weights.heavy, fontSize: "clamp(2rem,6vw,3.5rem)" }}>Naima — Palette Preview</h1>
          <p style={{ color: theme.colors.text.secondary, marginTop: 8 }}>Pastel-forward UI with dark, legible text. CTAs use the warm primary.</p>
        </header>

        <Row>
          <Button>Primary CTA</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="success">Success</Button>
        </Row>

        <Band bg={theme.colors.brand.blush}>
          <ContentWidth>
            <SectionHeader>Blush Band</SectionHeader>
            <p style={{ marginTop: 8 }}>Great for hero sub-sections, promotions, or newsletter prompts.</p>
          </ContentWidth>
        </Band>

        <Row>
          <Card bg={theme.colors.brand.lavender}>
            <Stack>
              <h3>Lavender Card</h3>
              <p>Use for gentle content areas and product details.</p>
              <Tag bg={theme.colors.brand.sky}>Info</Tag>
            </Stack>
          </Card>

          <Card bg={theme.colors.semantic.successBg}>
            <Stack>
              <h3>Success Notice</h3>
              <p>Order received and confirmed.</p>
              <div>
                <Button variant="success">View Order</Button>
              </div>
            </Stack>
          </Card>

          <Gradient>
            <Stack>
              <h3>Sky → Lavender Gradient</h3>
              <p>Lovely under photography or as a subtle banner.</p>
            </Stack>
          </Gradient>
        </Row>

        <section>
          <SectionHeader>Swatches</SectionHeader>
          <p style={{ color: theme.colors.text.secondary, marginTop: 6 }}>All text/icons shown should use dark text (#1e293b) on these tints for AA/AAA contrast.</p>
          <Swatches>
            {[ 
              {name: 'brand.primary (CTA)', hex: theme.colors.brand.primary},
              {name: 'brand.blush', hex: theme.colors.brand.blush},
              {name: 'brand.sky', hex: theme.colors.brand.sky},
              {name: 'brand.lavender', hex: theme.colors.brand.lavender},
              {name: 'brand.mint', hex: theme.colors.brand.mint},
            ].map(s => (
              <Swatch key={s.name}>
                <SwatchChip color={s.hex} />
                <SwatchLabel>
                  <span>{s.name}</span>
                  <code style={{ color: theme.colors.text.muted }}>{s.hex}</code>
                </SwatchLabel>
              </Swatch>
            ))}
          </Swatches>
        </section>
      </Page>
    </ThemeProvider>
  );
}
