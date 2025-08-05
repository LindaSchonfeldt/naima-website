import { theme } from './theme'

export const media = {
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`
}

// Alternative approach with functions for more flexibility
export const mediaQueries = {
  up: (size) => `@media (min-width: ${theme.breakpoints[size]})`,
  down: (size) => `@media (max-width: ${theme.breakpoints[size]})`,
  between: (min, max) =>
    `@media (min-width: ${theme.breakpoints[min]}) and (max-width: ${theme.breakpoints[max]})`
}
