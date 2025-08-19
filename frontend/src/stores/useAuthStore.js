import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  companyToken: null,
  isLoggedIn: false,
  setAuth: (token) => set({ companyToken: token, isLoggedIn: !!token }),
  logout: () => set({ companyToken: null, isLoggedIn: false })
}))
