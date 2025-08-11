import styled from 'styled-components'

const StyledButton = styled.button`
  /* Use $variant instead of variant */
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.primary : 'transparent'};

  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.white : theme.colors.primary};

  border: 2px solid ${({ theme }) => theme.colors.primary};

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

export const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} className={className} {...props}>
      {children}
    </StyledButton>
  )
}
