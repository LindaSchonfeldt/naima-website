import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { api } from '../services/api'

const useProductStore = create(
  devtools(
    (set, get) => ({
      // State
      products: [],
      featuredProducts: [],
      currentProduct: null,
      loading: false,
      error: null,
      filters: {},
      selectedSizes: {},

      // Actions - Add useCallback equivalent for Zustand
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setFilters: (filters) => set({ filters }),
      setSelectedSize: (productId, size) =>
        set((state) => ({
          selectedSizes: { ...state.selectedSizes, [productId]: size }
        })),

      // Fetch all products
      fetchProducts: async (filters = {}) => {
        set({ loading: true, error: null })
        try {
          const data = await api.products.getAll(filters)
          set({
            products: data,
            loading: false,
            filters
          })
        } catch (error) {
          set({
            error: error.message,
            loading: false
          })
          console.error('Failed to fetch products:', error)
        }
      },

      // Fetch featured products
      fetchFeaturedProducts: async () => {
        const state = get()

        // Prevent multiple simultaneous calls
        if (state.loading) {
          console.log('🔍 Already loading products, skipping...')
          return state.featuredProducts // Return existing data
        }

        if (state.featuredProducts.length > 0) {
          console.log('🔍 Products already loaded, skipping...')
          return state.featuredProducts // Return existing data
        }

        console.log('🔍 Starting to fetch featured products...')
        set({ loading: true, error: null })

        try {
          const data = await api.products.getFeatured() // ✅ Use correct API method
          console.log('✅ Products fetched successfully:', data)
          set({ featuredProducts: data, loading: false })
          return data
        } catch (error) {
          console.error('❌ Error fetching products:', error)
          set({ error: error.message, loading: false })
          throw error
        }
      },

      // Fetch single product
      fetchProduct: async (id) => {
        set({ loading: true, error: null })
        try {
          const data = await api.products.getById(id)
          set({
            currentProduct: data,
            loading: false
          })
        } catch (error) {
          set({
            error: error.message,
            loading: false
          })
          console.error('Failed to fetch product:', error)
        }
      },

      // Search products
      searchProducts: async (query) => {
        set({ loading: true, error: null })
        try {
          const data = await api.products.search(query)
          set({
            products: data,
            loading: false
          })
        } catch (error) {
          set({
            error: error.message,
            loading: false
          })
          console.error('Failed to search products:', error)
        }
      },

      // Get products by category
      fetchProductsByCategory: async (category) => {
        set({ loading: true, error: null })
        try {
          const data = await api.products.getByCategory(category)
          set({
            products: data,
            loading: false
          })
        } catch (error) {
          set({
            error: error.message,
            loading: false
          })
          console.error('Failed to fetch products by category:', error)
        }
      },

      // Clear current product
      clearCurrentProduct: () => set({ currentProduct: null }),

      // Clear error
      clearError: () => set({ error: null }),

      // Reset store
      reset: () =>
        set({
          products: [],
          featuredProducts: [],
          currentProduct: null,
          loading: false,
          error: null,
          filters: {}
        })
    }),
    {
      name: 'product-store' // name for devtools
    }
  )
)

export default useProductStore
