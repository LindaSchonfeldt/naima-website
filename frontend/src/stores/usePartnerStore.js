import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { api } from '../services/api'

// Map the local data shape → API shape
const normalize = (rows = []) =>
  rows.map((r) => ({
    _id: r._id || r.id || `${r.name}-${r.website || 'local'}`,
    name: r.name,
    type: 'catering_partner',
    website: r.website || r.url || '',
    isActive: true,
    logo: r.logo
      ? { url: r.logo, alt: r.alt || r.name } // local file uses `logo` string
      : { url: '', alt: r.alt || r.name }
  }))

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
          // dynamic import so it’s only bundled if needed
          const mod = await import('../data/cateringPartners')
          const partners = mod?.cateringPartners ?? mod?.default ?? []
          // update your store/state with partners
          set({ partners })
        } catch (err) {
          console.error('Failed to load catering partners:', err)
          set({ partners: [] })
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
