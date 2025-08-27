import { create } from 'zustand';
import axios from 'axios';
 import useAuthStore from './authStore';

const usePollingStationStore = create((set, get) => ({
  pollingStations: [],
  pagination: null,
  selectedPollingStation: null,

  isAddFormOpen: false,
  isEditFormOpen: false,
  deleteModal: { 
    isOpen: false,
    isLoading: false,
    pollingStation: null
  },

  fetchPollingStations: async (constituency_id = null, page = 1) => {
     const { token } = useAuthStore.getState();
    try {
      let url = `http://127.0.0.1:8000/api/pollingstation?page=${page}`;
      if (constituency_id) {
        url = `http://127.0.0.1:8000/api/constituency/${constituency_id}/pollingstations?page=${page}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` } // include token
      });
      const result = response.data.data;
      set({
        pollingStations: result,
        pagination: {
          current_page: response.data.current_page ?? 1,
          last_page: response.data.last_page ?? 1,
          per_page: response.data.per_page ?? 10,
          total: response.data.total ?? result.length
        }
      });
    } catch (error) {
      console.error('Failed to fetch polling stations:', error);
      set({ pollingStations: [], pagination: null });
    }
  },


  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),

  openEditForm: (pollingStation) => set({
    selectedPollingStation: pollingStation,
    isEditFormOpen: true
  }),
  closeEditForm: () => set({
    selectedPollingStation: null,
    isEditFormOpen: false
  }),

  openDeleteModal: (pollingStation) => set({
    deleteModal: {
      isOpen: true,
      isLoading: false,
      pollingStation
    }
  }),
  closeDeleteModal: () => set({
    deleteModal: {
      isOpen: false,
      isLoading: false,
      pollingStation: null
    }
  }),

  confirmDeletePollingStation: async () => {
     const { token } = useAuthStore.getState();
    const { deleteModal, fetchPollingStations, closeDeleteModal } = get();
    const id = deleteModal.pollingStation?.id;
    if (!id) return;

    try {
      set((state) => ({
        deleteModal: {
          ...state.deleteModal,
          isLoading: true
        }
      }));

      await axios.delete(`http://127.0.0.1:8000/api/pollingstation/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // include token
      });
      await fetchPollingStations();
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete polling station:', error);
    }
  }
}));

export default usePollingStationStore;
