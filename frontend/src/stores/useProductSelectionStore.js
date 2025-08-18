// stores/useProductSelectionStore.js
import { create } from 'zustand'

export const useProductSelectionStore = create((set) => ({
  selectedSizes: {},
  setSelectedSize: (productId, size) =>
    set((state) => ({
      selectedSizes: { ...state.selectedSizes, [productId]: size }
    }))
}))
