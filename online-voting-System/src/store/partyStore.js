// partyStore.js
import { create } from 'zustand';
import axios from 'axios';

const usePartyStore = create((set, get) => ({
  parties: [],
  loading: false,
  error: null,
  successMessage: '',
  isAddFormOpen: false,
  isEditFormOpen: false,
  selectedRegion: null,

   openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),
  openEditForm: (region) => set({ selectedRegion: region, isEditFormOpen: true }),
  closeEditForm: () => set({ selectedRegion: null, isEditFormOpen: false }),

  fetchParties: async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/party');
      set({ parties: response.data.data });
    } catch (error) {
      console.error('Failed to fetch parties:', error);
    }
  },

 

  // deleteParty: async (id) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/api/party/${id}`);
  //     await get().fetchParties();
  //   } catch (error) {
  //     console.error('Failed to delete party:', error);
  //   }
  // },
   deleteModal: {
      isOpen: false,
      party: null,
      isLoading: false,
    },
    openDeleteModal: (party) =>
      set({ deleteModal: { isOpen: true, party, isLoading: false } }),
    closeDeleteModal: () =>
      set({ deleteModal: { isOpen: false, party: null, isLoading: false } }),

    confirmDeleteParty: async () => {
      const { deleteModal, fetchParties, closeDeleteModal } = get();
    const id = deleteModal.party?.id;
    if (!id) return;
      try {
        set((state) => ({
        deleteModal: { ...state.deleteModal, isLoading: true }
      }));
      await axios.delete(`http://127.0.0.1:8000/api/pollingstation/${id}`);
      await fetchParties();
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete polling station:', error);
    }
    },


  toggleStatus: async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await axios.patch(`/api/party/status/${id}`, { status: newStatus });
      await get().fetchParties();
    } catch (error) {
      console.error('Failed to toggle party status:', error);
    }
  },
}));

export default usePartyStore;