import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      isOpen: false,
      items: [],
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item._id === product._id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              ),
              isOpen: true
            }
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
            isOpen: true
          }
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId)
        })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage', // key in localStorage
      partialize: (state) => ({ items: state.items }) // only persist items
    }
  )
)
