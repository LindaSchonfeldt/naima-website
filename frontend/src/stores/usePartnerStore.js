import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { api } from '../services/api'

const usePartnerStore = create(
  devtools(
    (set, get) => ({
      // State
      partners: [],
      servedAtPartners: [],
      cateringPartners: [],
      loading: false,
      error: null,

      // Actions
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // Fetch all partners
      fetchPartners: async (type = null) => {
        set({ loading: true, error: null })
        try {
          const data = await api.partners.getAll(type)
          set({
            partners: data,
            loading: false
          })
        } catch (error) {
          set({
            error: error.message,
            loading: false
          })
          console.error('Failed to fetch partners:', error)
        }
      },

      // Fetch served-at partners
      fetchServedAtPartners: async () => {
        set({ loading: true, error: null })
        try {
          const data = await api.partners.getServedAt()
          set({
            servedAtPartners: data,
            loading: false
          })
        } catch (error) {
          set({
            error: error.message,
            loading: false
          })
          console.error('Failed to fetch served-at partners:', error)
        }
      },

      // Fetch catering partners
      fetchCateringPartners: async () => {
        set({ loading: true, error: null })
        try {
          const data = await api.partners.getCatering()
          set({
            cateringPartners: data,
            loading: false
          })
        } catch (error) {
          set({
            error: error.message,
            loading: false
          })
          console.error('Failed to fetch catering partners:', error)
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Reset store
      reset: () =>
        set({
          partners: [],
          servedAtPartners: [],
          cateringPartners: [],
          loading: false,
          error: null
        })
    }),
    {
      name: 'partner-store'
    }
  )
)

export default usePartnerStore
