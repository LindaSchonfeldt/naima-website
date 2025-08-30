import create from 'zustand'

export const useUiStore = create((set, get) => ({
  // { [key]: count }
  loadingCounters: {},

  startLoading: (key = 'global') =>
    set((state) => {
      const next = (state.loadingCounters[key] || 0) + 1
      return { loadingCounters: { ...state.loadingCounters, [key]: next } }
    }),

  stopLoading: (key = 'global') =>
    set((state) => {
      const prev = state.loadingCounters[key] || 0
      const next = Math.max(prev - 1, 0)
      return { loadingCounters: { ...state.loadingCounters, [key]: next } }
    }),

  // convenience selector if you need it via get()
  isLoadingKey: (key = 'global') => {
    const counters = get().loadingCounters
    return (counters[key] || 0) > 0
  }
}))
