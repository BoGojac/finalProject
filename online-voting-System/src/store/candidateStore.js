import { create } from 'zustand';
import axios from 'axios';

const useCandidateStore = create((set, get) => ({
  candidates: [],
  selectedCandidate: null,
  isAddFormOpen: false,
  isEditFormOpen: false,

  fetchCandidates: async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/candidate');
      set({ candidates: res.data });
    } catch (err) {
      console.error('Error fetching candidates:', err);
    }
  },

  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),

  openEditForm: (candidate) =>
    set({ selectedCandidate: candidate, isEditFormOpen: true }),
  closeEditForm: () => set({ isEditFormOpen: false, selectedCandidate: null }),

  toggleStatus: async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

      await axios.patch(`http://127.0.0.1:8000/api/user/status/${userId}`, {
        status: newStatus,
      });

      // Refresh candidates so updated user status reflects
      await get().fetchCandidates();
    } catch (error) {
      console.error('Failed to toggle candidate status', error.response?.data || error.message);
    }
  },
}));
export default useCandidateStore;
