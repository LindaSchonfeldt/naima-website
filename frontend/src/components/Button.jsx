import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${(props) => {
    if (props.variant === 'secondary') return 'transparent'
    if (props.variant === 'hover') return props.theme.colors.primary
    return props.theme.colors.primary
  }};
  color: ${(props) => {
    if (props.variant === 'secondary') return props.theme.colors.primary
    if (props.variant === 'hover') return 'white'
    return 'white'
  }};
  border: ${(props) =>
    props.variant === 'secondary'
      ? `2px solid ${props.theme.colors.primary}`
      : 'none'};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${(props) => (props.size === 'large' ? '1.1rem' : '1rem')};

  /* Hover variant specific styles */
  opacity: ${(props) => (props.variant === 'hover' ? '0' : '1')};
  transform: ${(props) =>
    props.variant === 'hover' ? 'translateY(10px)' : 'translateY(0)'};

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary'
        ? props.theme.colors.primary
        : props.theme.colors.secondary};
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
