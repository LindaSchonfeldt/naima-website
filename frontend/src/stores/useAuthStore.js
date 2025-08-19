import { create } from 'zustand'

const initialToken = localStorage.getItem('companyToken')

export const useAuthStore = create((set) => ({
  companyToken: initialToken,
  isLoggedIn: !!initialToken,
  setAuth: (token) => set({ companyToken: token, isLoggedIn: !!token }),
  logout: () => {
    localStorage.removeItem('companyToken')
    set({ companyToken: null, isLoggedIn: false })
  }
}))
