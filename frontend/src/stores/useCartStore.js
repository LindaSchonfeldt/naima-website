import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      addToCart: (product, selectedSize, quantity = 1) =>
        set((state) => {
          const sizeId = String(
            selectedSize._id ||
              product.sizes.findIndex((s) => s === selectedSize)
          )
          const cartKey = `${product._id}-${sizeId}`
          const existingItem = state.items.find(
            (item) => item.cartKey === cartKey
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartKey === cartKey
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            return {
              items: [
                ...state.items,
                {
                  ...product,
                  selectedSize,
                  quantity,
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
    }),
    {
      name: 'cart-store', // key in localStorage
      partialize: (state) => ({
        items: state.items
      })
    }
  )
)
