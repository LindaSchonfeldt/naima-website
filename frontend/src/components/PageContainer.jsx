import styled from 'styled-components'

import { media } from '../styles/media'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: ${(props) => props.theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;

  ${media.sm} {
    align-items: flex-start;
    padding: ${(props) => props.theme.spacing.lg};
  }

  ${media.md} {
    padding: ${(props) => props.theme.spacing.xl};
  }
`
