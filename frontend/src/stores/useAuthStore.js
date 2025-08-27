import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      companyToken: null,
      isLoggedIn: false,
      company: null, // persisted company/profile object
      // setAuth accepts token and optional company object
      setAuth: (token, company = null) =>
        set({ companyToken: token, isLoggedIn: !!token, company }),
      // allow updating just the company/profile
      setCompany: (company) => set({ company }),
      logout: () => {
        set({ companyToken: null, isLoggedIn: false, company: null })
      }
    }),
    {
      name: 'company-auth', // key in localStorage
      partialize: (state) => ({
        companyToken: state.companyToken,
        isLoggedIn: state.isLoggedIn,
        company: state.company
      })
    }
  )
)
