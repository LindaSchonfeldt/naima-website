import { Grid, Stack } from '@mui/material'
import styled from 'styled-components'

const StyledGrid = styled(Grid)`
  padding: ${(props) => props.theme.spacing.sm};
`

const Item = styled.div`
  background: ${(props) => props.theme.colors.brand.mint};
  padding: ${(props) => props.theme.spacing.sm};
`

export const ImageGrid = ({ children, ...props }) => {
  return (
    <StyledGrid container spacing={2} {...props}>
      <Grid item xs={6}>
        <Stack spacing={2} direction='column'>
          <Item>Column 1 - Row 1</Item>
          <Item>Column 1 - Row 2</Item>
          <Item>Column 1 - Row 3</Item>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={2} direction='column'>
          <Item>Column 2 - Row 1</Item>
          <Item>Column 2 - Row 2</Item>
        </Stack>
      </Grid>
    </StyledGrid>
  )
}
