// store/registrationTimespanStore.js
import { create } from 'zustand';

const useRegistrationTimespanStore = create((set) => ({
  selectedVotingDate: null,
  isDropdownOpen: false,
  editingType: null,
  success: '',
  error: '',

  toggleDropdown: () =>
    set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),

  setSelectedVotingDate: (id) => set({ selectedVotingDate: id }),

  setEditingType: (type) => set({ editingType: type }),

  cancelEdit: () => set({ editingType: null }),

  setSuccess: (message) => set({ success: message, error: '' }),

  setError: (message) => set({ error: message, success: '' }),

  clearMessages: () => set({ success: '', error: '' }),
}));

export default useRegistrationTimespanStore;
