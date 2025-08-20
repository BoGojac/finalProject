import { create } from 'zustand'
import axios from 'axios'

const usePeriodStore = create((set, get) => ({
  periods: {
    voter: null,
    candidate: null,
  },
  isLoading: false,
  error: '',

  fetchAll: async () => {
    set({ isLoading: true, error: '' })
    try {
      const votingDateId = get().selectedVotingDate;
      if (!votingDateId) return;
      
      const response = await axios.get(`/api/registration-time-span?include_dates=1&voting_date_id=${votingDateId}`);
      
      // Map periods to voter/candidate
      const mapPeriod = (type) => {
        const found = response.data.data.find(p => p.type === type);
        return found ? {
          ...found,
          tempStart: found.beginning_date,
          tempEnd: found.ending_date
        } : null;
      }

      set({
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
      const existing = get().periods[type];
      let response;
      
      if (existing?.id) {
        response = await axios.put(`/api/registration-time-span/${existing.id}`, payload);
      } else {
        response = await axios.post('/api/registration-time-span', payload);
      }
      
      // Update the store with the saved period
      set((state) => ({
        periods: {
          ...state.periods,
          [type]: {
            ...response.data.data,
            tempStart: response.data.data.beginning_date,
            tempEnd: response.data.data.ending_date
          }
        },
        isLoading: false
      }))
      
      return true;
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message || 'Failed to save period', 
        isLoading: false 
      });
      return false;
    }
  },

  setTempDates: (type, field, value) => {
    set((state) => ({
      periods: {
        ...state.periods,
        [type]: {
          ...state.periods[type],
          [field]: value
        }
      }
    }));
  }
}));

export default usePeriodStore;