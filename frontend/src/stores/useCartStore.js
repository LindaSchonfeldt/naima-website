import { create } from 'zustand'

export const useCartStore = create((set) => ({
  isOpen: false,
  items: [],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addToCart: (product) =>
    set((state) => ({
      items: [...(state.items || []), product], // fallback to [] if undefined
      isOpen: true
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      items: (state.items || []).filter((item) => item._id !== productId)
    })),
  clearCart: () => set({ items: [] })
}))
