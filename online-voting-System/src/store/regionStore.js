// src/store/regionStore.js
import { create } from 'zustand';
import axios from 'axios'; 

const useRegionStore = create((set) => ({
  regions: [],
  pagination: null,
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

  fetchRegions: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/regions?page=${page}`);
      const data = response.data.data
      set({ regions:  data.data,
            pagination: {
            current_page: data.current_page,
            last_page: data.last_page,
            per_page: data.per_page,
            total: data.total
          }
       });
    } catch (err) {
      set({ error: err?.response?.data?.message || err.message, pagination: null  });
    } finally {
      set({ loading: false });
    }
  },


  // ❌ Delete region

    deleteModal: {
      isOpen: false,
      region: null,
      isLoading: false,
    },
    openDeleteModal: (region) =>
      set({ deleteModal: { isOpen: true, region, isLoading: false } }),
    closeDeleteModal: () =>
      set({ deleteModal: { isOpen: false, region: null, isLoading: false } }),
    confirmDeleteRegion: async () => {
      set((state) => ({
        deleteModal: { ...state.deleteModal, isLoading: true }
      }));

      try {
        const id = useRegionStore.getState().deleteModal.region.id;
        await useRegionStore.getState().deleteRegion(id);
        useRegionStore.getState().closeDeleteModal();
      } catch (error) {
        set((state) => ({
          deleteModal: { ...state.deleteModal, isLoading: false },
          error: error.response?.data?.message || error.message || 'Delete failed',
        }));
      }
    },

  deleteRegion: async (id) => {
    set({ loading: true, error: null, successMessage: '' });
    try {
      await axios.delete(`http://127.0.0.1:8000/api/regions/${id}`);
      set((state) => ({
        regions: state.regions.filter((region) => region.id !== id),
        successMessage: 'Region deleted successfully',
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to delete region',
      });
    } finally {
      set({ loading: false });
    }
  },

  // Utility
  clearMessages: () => set({ error: null, successMessage: '' }),
}));

export default useRegionStore;