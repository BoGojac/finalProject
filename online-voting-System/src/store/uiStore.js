// store/uiStore.js
import { create } from 'zustand';

const useUIStore = create((set) => ({
  successMessage: '',
  setSuccessMessage: (msg) => set({ successMessage: msg }),
  clearSuccessMessage: () => set({ successMessage: '' }),
}));

export default useUIStore;
