import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  closeCart: () => set({ isOpen: false }),
  addToCart: (product, selectedSize) =>
    set((state) => {
      const sizeId = String(
        selectedSize._id || product.sizes.findIndex((s) => s === selectedSize)
      )
      const cartKey = `${product._id}-${sizeId}`
      const existingItem = state.items.find((item) => item.cartKey === cartKey)

      if (existingItem) {
        // Increase quantity if already in cart
        return {
          items: state.items.map((item) =>
            item.cartKey === cartKey
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      } else {
        // Add new item
        return {
          items: [
            ...state.items,
            {
              ...product,
              selectedSize,
              quantity: 1,
              cartKey
            }
          ]
        }
      }
    }),
  removeFromCart: (cartKey) =>
    set((state) => ({
      items: state.items.filter((item) => item.cartKey !== cartKey)
    })),
  updateQuantity: (cartKey, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    }))
}))
