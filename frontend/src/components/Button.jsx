import styled from 'styled-components'

const buttonSizes = {
  small: '0.9rem',
  medium: '1rem',
  large: '1.1rem'
}

const buttonVariants = {
  primary: {
    background: (theme) => theme.colors.primary,
    color: 'white',
    border: 'none',
    opacity: '1',
    transform: 'translateY(0)',
    hoverBackground: (theme) => theme.colors.secondary
  },
  secondary: {
    background: 'transparent',
    color: (theme) => theme.colors.primary,
    border: (theme) => `2px solid ${theme.colors.primary}`,
    opacity: '1',
    transform: 'translateY(0)',
    hoverBackground: (theme) => theme.colors.primary
  },
  hover: {
    background: (theme) => theme.colors.primary,
    color: 'white',
    border: 'none',
    opacity: '0',
    transform: 'translateY(0)',
    hoverBackground: (theme) => theme.colors.secondary
  }
}

const StyledButton = styled.button`
  /* ✅ Fix: Use consistent variant access */
  background-color: ${({ theme, $variant = 'primary' }) => {
    const variant = buttonVariants[$variant] || buttonVariants.primary
    return typeof variant.background === 'function'
      ? variant.background(theme)
      : variant.background
  }};

  color: ${({ theme, $variant = 'primary' }) => {
    const variant = buttonVariants[$variant] || buttonVariants.primary
    return typeof variant.color === 'function'
      ? variant.color(theme)
      : variant.color
  }};

  border: ${({ theme, $variant = 'primary' }) => {
    const variant = buttonVariants[$variant] || buttonVariants.primary
    return typeof variant.border === 'function'
      ? variant.border(theme)
      : variant.border || `2px solid ${theme.colors.primary}`
  }};

  /* ✅ Fix: Handle hover variant initial state */
  opacity: ${({ $variant = 'primary' }) => {
    const variant = buttonVariants[$variant] || buttonVariants.primary
    return variant.opacity || '1'
  }};

  transform: ${({ $variant = 'primary' }) => {
    const variant = buttonVariants[$variant] || buttonVariants.primary
    return variant.transform || 'translateY(0)'
  }};

  /* Common styles */
  padding: 
    ${(props) => props.theme.spacing.sm},
    ${(props) => props.theme.spacing.lg};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ size = 'medium' }) => buttonSizes[size]};

  &:hover {
    /* ✅ Fix: Safely access hoverBackground */
    background-color: ${({ theme, $variant = 'primary' }) => {
      const variant = buttonVariants[$variant] || buttonVariants.primary
      return typeof variant.hoverBackground === 'function'
        ? variant.hoverBackground(theme)
        : variant.hoverBackground || theme.colors.primary
    }};

    color: white;
    opacity: 1;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
