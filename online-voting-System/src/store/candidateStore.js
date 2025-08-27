import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const useCandidateStore = create((set, get) => ({
  candidates: [],
  pagination: null,
  selectedCandidate: null,
  isAddFormOpen: false,
  isEditFormOpen: false,
  
  fetchCandidates: async (page = 1) => {
     const { token } = useAuthStore.getState();
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/candidate?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` } // include token
      });
        const data = res.data;

        set({
          candidates: data.data, // main data array
          pagination: {
            current_page: data.current_page,
            last_page: data.last_page,
            per_page: data.per_page,
            total: data.total
          }
        });
      } catch (err) {
        console.error('Error fetching candidates:', err);
        set({ candidates: [], pagination: null });
      }
    },



  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),

  openEditForm: (candidate) =>
    set({ selectedCandidate: candidate, isEditFormOpen: true }),
  closeEditForm: () => set({ isEditFormOpen: false, selectedCandidate: null }),

  toggleStatus: async (userId, currentStatus) => {
     const { token } = useAuthStore.getState();
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

      await axios.patch(`http://127.0.0.1:8000/api/user/status/${userId}`, {
        status: newStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` } // include token
      });

      // Refresh candidates so updated user status reflects
      await get().fetchCandidates();
    } catch (error) {
      console.error('Failed to toggle candidate status', error.response?.data || error.message);
    }
  },
}));
export default useCandidateStore;
