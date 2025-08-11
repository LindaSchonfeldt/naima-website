import styled from 'styled-components'

// Define all button variants in objects
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
    transform: 'translateY(10px)',
    hoverBackground: (theme) => theme.colors.secondary
  }
}

const buttonSizes = {
  small: '0.9rem',
  medium: '1rem',
  large: '1.1rem'
}

const StyledButton = styled.button`
  /* Get variant styles */
  background-color: ${({ variant, theme }) =>
    typeof buttonVariants[variant].background === 'function'
      ? buttonVariants[variant].background(theme)
      : buttonVariants[variant].background};

  color: ${({ variant, theme }) =>
    typeof buttonVariants[variant].color === 'function'
      ? buttonVariants[variant].color(theme)
      : buttonVariants[variant].color};

  border: ${({ variant, theme }) =>
    typeof buttonVariants[variant].border === 'function'
      ? buttonVariants[variant].border(theme)
      : buttonVariants[variant].border};

  opacity: ${({ variant }) => buttonVariants[variant].opacity};
  transform: ${({ variant }) => buttonVariants[variant].transform};

  /* Common styles */
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ size }) => buttonSizes[size]};

  &:hover {
    background-color: ${({ variant, theme }) =>
      buttonVariants[variant].hoverBackground(theme)};
    color: white;
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
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  )
}
