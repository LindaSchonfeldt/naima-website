//Purpose: Reusable media query helpers using theme breakpoints

import theme from './theme' // Changed from { theme }

export const media = {
  xs: `@media (min-width: ${theme.breakpoints.xs})`,
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  xxl: `@media (min-width: ${theme.breakpoints.xxl})`,
  xxxl: `@media (min-width: ${theme.breakpoints.xxxl})`,

  // Max-width queries (for mobile-first approach)
  maxXs: `@media (max-width: ${parseInt(theme.breakpoints.sm) - 1}px)`,
  maxSm: `@media (max-width: ${parseInt(theme.breakpoints.md) - 1}px)`,
  maxMd: `@media (max-width: ${parseInt(theme.breakpoints.lg) - 1}px)`,
  maxLg: `@media (max-width: ${parseInt(theme.breakpoints.xl) - 1}px)`,
  maxXl: `@media (max-width: ${parseInt(theme.breakpoints.xxl) - 1}px)`,

  // Range queries
  smToMd: `@media (min-width: ${theme.breakpoints.sm}) and (max-width: ${
    parseInt(theme.breakpoints.md) - 1
  }px)`,
  mdToLg: `@media (min-width: ${theme.breakpoints.md}) and (max-width: ${
    parseInt(theme.breakpoints.lg) - 1
  }px)`,
  lgToXl: `@media (min-width: ${theme.breakpoints.lg}) and (max-width: ${
    parseInt(theme.breakpoints.xl) - 1
  }px)`
}

// Alternative approach with functions for more flexibility
export const mediaQueries = {
  up: (size) => `@media (min-width: ${theme.breakpoints[size]})`,
  down: (size) => `@media (max-width: ${theme.breakpoints[size]})`,
  between: (min, max) =>
    `@media (min-width: ${theme.breakpoints[min]}) and (max-width: ${theme.breakpoints[max]})`
}
