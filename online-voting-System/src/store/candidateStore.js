import { create } from 'zustand';
import axios from 'axios';

const useCandidateStore = create((set) => ({
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

  toggleStatus: async (id, currentStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api//user/status/${id}`, {
        status: currentStatus === 'active' ? 'inactive' : 'active',
      });
      await useCandidateStore.getState().fetchCandidates();
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  },
}));
export default useCandidateStore;
