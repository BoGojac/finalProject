// store/profileStore.js
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  showPasswordForm: false,
  togglePasswordForm: () => set((state) => ({ showPasswordForm: !state.showPasswordForm })),

  passwordVisibility: {
    current: false,
    new: false,
    confirm: false,
  },

  togglePasswordVisibility: (field) =>
    set((state) => ({
      passwordVisibility: {
        ...state.passwordVisibility,
        [field]: !state.passwordVisibility[field],
      },
    })),

  // ✅ Add message state
  passwordMessage: '',
  passwordMessageType: '', // 'success' or 'error'

  setPasswordMessage: (message, type) =>
    set({
      passwordMessage: message,
      passwordMessageType: type,
    }),

  clearPasswordMessage: () =>
    set({
      passwordMessage: '',
      passwordMessageType: '',
    }),
}));

export default useProfileStore;
