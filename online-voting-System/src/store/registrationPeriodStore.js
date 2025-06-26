import { create } from 'zustand'
import axios from 'axios'

export const usePeriodStore = create((set, get) => ({
  votingDates: [],
  periods: {
    voter: null,
    candidate: null,
  },
  isLoading: false,
  error: '',

  fetchAll: async () => {
    set({ isLoading: true, error: '' })
    try {
      const [votingDatesRes, periodsRes] = await Promise.all([
        axios.get('/api/voting-dates'),
        axios.get('/api/registration-time-span')
      ])

      const mapPeriod = (type) => {
        const found = periodsRes.data.data.find(p => p.type === type)
        return found || null
      }

      set({
        votingDates: votingDatesRes.data.data,
        periods: {
          voter: mapPeriod('voter'),
          candidate: mapPeriod('candidate'),
        },
        error: '',
        isLoading: false
      })
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message || 'Failed to load data',
        isLoading: false
      })
    }
  },

  savePeriod: async (type, payload) => {
    set({ isLoading: true, error: '' })
    try {
      const existing = get().periods[type]
      let response
      if (existing?.id) {
        response = await axios.put(`/api/registration-time-span/${existing.id}`, { type, ...payload })
      } else {
        response = await axios.post('/api/registration-time-span', { type, ...payload })
      }
      set((state) => ({
        periods: {
          ...state.periods,
          [type]: response.data.data
        },
        isLoading: false
      }))
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || err.message || 'Failed to save period', isLoading: false })
      return false
    }
  },

  deletePeriod: async (type) => {
    const existing = get().periods[type]
    if (!existing?.id) return false
    set({ isLoading: true, error: '' })
    try {
      await axios.delete(`/api/registration-time-span/${existing.id}`)
      set((state) => ({
        periods: {
          ...state.periods,
          [type]: null
        },
        isLoading: false
      }))
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || err.message || 'Failed to delete period', isLoading: false })
      return false
    }
  },
}))
 