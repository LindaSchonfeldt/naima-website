import { FiChevronDown } from 'react-icons/fi'
import styled from 'styled-components'

const StyledDropdownMenu = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

const DropdownSelect = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  appearance: none; /* Hide default arrow */
  background: transparent;
  /* Add right padding for the icon */
  padding-right: 2.5em;
`

const DropdownIcon = styled(FiChevronDown)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  font-size: 1.2em;
`

export const DropdownMenu = ({
  options = [],
  value,
  onChange,
  getLabel = (option) => option.label || option,
  getValue = (option) => option.value || option,
  ...props
}) => (
  <StyledDropdownMenu>
    <DropdownSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </DropdownSelect>
    <DropdownIcon />
  </StyledDropdownMenu>
)
