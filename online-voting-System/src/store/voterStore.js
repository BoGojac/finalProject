// src/store/voterStore.js
import { create } from 'zustand';
import axios from 'axios';

const useVoterStore = create((set, get) => ({
  voters: [],
  isAddFormOpen: false,
  isEditFormOpen: false,
  selectedVoter: null,

  fetchVoters: async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/voter');
      // console.log(response.data.data)
      set({ voters: response.data.data });
    } catch (error) {
      console.error('Failed to fetch voters:', error);
    }
  },

  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),

  openEditForm: (voter) => set({ selectedVoter: voter, isEditFormOpen: true }),
  closeEditForm: () => set({ isEditFormOpen: false, selectedVoter: null }),
  

  toggleStatus: async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await axios.patch(`http://127.0.0.1:8000/api/user/status/${userId}`, { status: newStatus });
      get().fetchVoters();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  },
}));

export default useVoterStore;
