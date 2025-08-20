import { create } from 'zustand';
import axios from 'axios';

const usePartyStore = create((set, get) => ({
  parties: [],
  pagination: null,
  loading: false,
  error: null,
  isAddFormOpen: false,
  isEditFormOpen: false,
  selectedParty: null,
  deleteModal: {
    isOpen: false,
    party: null,
    isLoading: false
  },

  // Form management
  openAddForm: () => set({ isAddFormOpen: true, error: null }),
  closeAddForm: () => set({ isAddFormOpen: false }),
  openEditForm: (party) => set({ 
    selectedParty: party, 
    isEditFormOpen: true,
    error: null 
  }),
  closeEditForm: () => set({ 
    selectedParty: null, 
    isEditFormOpen: false 
  }),

  // Party data operations
  fetchParties: async (page=1) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`http://127.0.0.1:8000/api/party?page=${page}`);
      set({ 
        parties: response.data.data.data, // actual list
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          total: response.data.data.total
        },
        loading: false
      });

    } catch (error) {
      console.error('Failed to fetch parties:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to fetch parties',
        loading: false 
      });
    }
  },

  // Delete operations
  openDeleteModal: (party) => set({ 
    deleteModal: { 
      isOpen: true, 
      party, 
      isLoading: false 
    } 
  }),
  closeDeleteModal: () => set({ 
    deleteModal: { 
      isOpen: false, 
      party: null, 
      isLoading: false 
    } 
  }),

  confirmDeleteParty: async () => {
    const { deleteModal } = get();
    const id = deleteModal.party?.id;
    if (!id) return;

    try {
      set({ 
        deleteModal: { 
          ...deleteModal, 
          isLoading: true 
        } 
      });
      await axios.delete(`http://127.0.0.1:8000/api/party/${id}`);
      await get().fetchParties();
      set({ 
        deleteModal: { 
          isOpen: false, 
          party: null, 
          isLoading: false 
        } 
      });
    } catch (error) {
      console.error('Failed to delete party:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to delete party',
        deleteModal: { 
          ...deleteModal, 
          isLoading: false 
        } 
      });
    }
  },

  // Status toggle
  toggleStatus: async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await axios.patch(
        `http://127.0.0.1:8000/api/party/status/${id}`, 
        { status: newStatus }
      );
      await get().fetchParties();
    } catch (error) {
      console.error('Failed to toggle party status:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to update status' 
      });
    }
  },

  // Clear error state
  clearError: () => set({ error: null })
}));

export default usePartyStore;