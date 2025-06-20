import { create } from 'zustand';
import axios from 'axios';

const usePollingStationStore = create((set, get) => ({
  pollingStations: [],
  selectedPollingStation: null,

  isAddFormOpen: false,
  isEditFormOpen: false,
  deleteModal: {
    isOpen: false,
    isLoading: false,
    pollingStation: null
  },

  fetchPollingStations: async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/pollingstation');
      set({ pollingStations: response.data.data });
    } catch (error) {
      console.error('Failed to fetch polling stations:', error);
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

      await axios.delete(`http://127.0.0.1:8000/api/pollingstation/${id}`);
      await fetchPollingStations();
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete polling station:', error);
    }
  }
}));

export default usePollingStationStore;
