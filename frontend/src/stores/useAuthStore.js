import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      companyToken: null,
      isLoggedIn: false,
      user: null,
      setAuth: (token) => set({ companyToken: token, isLoggedIn: !!token }),
      logout: () => {
        set({ companyToken: null, isLoggedIn: false })
      }
    }),
    {
      name: 'company-auth', // key in localStorage
      partialize: (state) => ({
        companyToken: state.companyToken,
        isLoggedIn: state.isLoggedIn
      })
    }
  )
)
