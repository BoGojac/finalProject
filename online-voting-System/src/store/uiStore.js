// store/uiStore.js
import { create } from 'zustand';

const useUIStore = create((set) => ({
  successMessage: '',
  setSuccessMessage: (msg) => set({ successMessage: msg }),
  clearSuccessMessage: () => set({ successMessage: '' }),

  showDropdown: false,
  setShowDropdown: (value) => set({ showDropdown: value }),
  toggleDropdown: () => set((state) => ({ showDropdown: !state.showDropdown })),
}));

export default useUIStore;
