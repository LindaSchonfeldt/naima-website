import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

import { useCartStore } from '../stores/useCartStore'
import { media } from '../styles/media'

const StyledCartNotification = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text.primary}};
`

// Notification badge for when items are added to the cart
export const CartNotification = () => {
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <StyledCartNotification
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {itemCount}
        </StyledCartNotification>
      )}
    </AnimatePresence>
  )
}
