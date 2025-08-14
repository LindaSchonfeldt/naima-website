import styled from 'styled-components'

import { media } from '../styles/media'

export const PageContainer = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;

  ${media.sm} {
    padding: ${(props) => props.theme.spacing.lg};
  }

  ${media.md} {
    padding: ${(props) => props.theme.spacing.xl};
  }
`
