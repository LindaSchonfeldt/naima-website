import { create } from 'zustand'

import { api } from '../services/api'

// Zustand store for managing company orders
export const useOrderStore = create((set) => ({
  // Array of orders for the logged-in company
  orders: [],
  // Setter for orders array
  setOrders: (orders) => set({ orders }),

  // Loading state for async operations
  loading: false,
  // Setter for loading state
  setLoading: (loading) => set({ loading }),

  // Error state for failed requests
  error: null,
  // Setter for error state
  setError: (error) => set({ error }),

  // Fetch orders for the logged-in company using JWT token
  fetchOrders: async (token) => {
    set({ loading: true, error: null }) // Start loading, clear previous errors
    try {
      // Make API request to fetch company orders
      const data = await api.get('/orders/company', {
        headers: {
          Authorization: `Bearer ${token}` // Pass JWT token for authentication
        }
      })

      // Accept either an array response or { data: [...] } shape
      const orders = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : []

      set({ orders, loading: false }) // Store orders, stop loading
    } catch (error) {
      set({ error: error.message || 'Failed to fetch orders', loading: false }) // Store error, stop loading
    }
  }
}))
