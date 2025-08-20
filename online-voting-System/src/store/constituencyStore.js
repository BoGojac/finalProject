// src/store/constituencyStore.js
import { create } from 'zustand';
import axios from 'axios';

const useConstituencyStore = create((set, get) => ({ 
  constituencies: [],
  pagination: null,
  selectedConstituency: null,

  deleteModal: {
    isOpen: false,
    isLoading: false,
    constituency: null
  },

  fetchConstituencies: async (page = 1) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/constituency?page=${page}`);
      const data = res.data.data;

      const constituenciesWithDetails = data.data.map((c) => ({
        ...c,
        region_name: c.region?.name || 'Unknown',
        voting_date_title: c.region?.voting_date?.title || 'N/A',
      }));

      set({
        constituencies: constituenciesWithDetails,
        pagination: {
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
        },
      });
    } catch (error) {
      console.error('Failed to fetch constituencies', error);
    }
  },

  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),
  isAddFormOpen: false,

  openEditForm: (constituency) =>
    set({ selectedConstituency: constituency, isEditFormOpen: true }),
  closeEditForm: () =>
    set({ selectedConstituency: null, isEditFormOpen: false }),
  isEditFormOpen: false,

  openDeleteModal: (constituency) =>
    set({
      deleteModal: {
        isOpen: true,
        isLoading: false,
        constituency
      }
    }),

  closeDeleteModal: () =>
    set({
      deleteModal: {
        isOpen: false,
        isLoading: false,
        constituency: null
      }
    }),

  confirmDeleteConstituency: async () => {
    const { deleteModal, fetchConstituencies } = get(); // ✅ Now `get` is defined
    const id = deleteModal.constituency?.id;

    if (!id) return;

    set((state) => ({
      deleteModal: { ...state.deleteModal, isLoading: true }
    }));

    try {
      await axios.delete(`http://127.0.0.1:8000/api/constituency/${id}`);
      fetchConstituencies();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      set({
        deleteModal: { isOpen: false, isLoading: false, constituency: null }
      });
    }
  }
}));

export default useConstituencyStore;
