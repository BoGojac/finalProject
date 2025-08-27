// src/store/voterStore.js
import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const useVoterStore = create((set, get) => ({
  voters: [],
  pagination:null,
  isAddFormOpen: false,
  isEditFormOpen: false,
  selectedVoter: null,

  fetchVoters: async (page=1) => {
    const { token } = useAuthStore.getState();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/voter?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` } // include token
      });
      // console.log(response.data.data)
      const paginationData = response.data.data;
      set({
        voters: paginationData.data, // ✅ This is the actual array of voters
        pagination: {
          current_page: paginationData.current_page,
          last_page: paginationData.last_page,
          per_page: paginationData.per_page,
          total: paginationData.total,
        },
      }); 
    } catch (error) {
      console.error('Failed to fetch voters:', error);
      set({ voters: [], pagination: null });
    }
  },

  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),

  openEditForm: (voter) => set({ selectedVoter: voter, isEditFormOpen: true }),
  closeEditForm: () => set({ isEditFormOpen: false, selectedVoter: null }),
  

  toggleStatus: async (userId, currentStatus) => {
     const { token } = useAuthStore.getState();
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await axios.patch(`http://127.0.0.1:8000/api/user/status/${userId}`, { status: newStatus, }
        , {
        headers: { Authorization: `Bearer ${token}` } // include token
      }
      );
      get().fetchVoters();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  },
}));

export default useVoterStore;
