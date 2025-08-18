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
      {options.map((option, idx) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </DropdownSelect>
  </StyledDropdownMenu>
)
