// src/store/constituencyStore.js
import { create } from 'zustand';
import axios from 'axios';

const useConstituencyStore = create((set, get) => ({ 
  constituencies: [],
  selectedConstituency: null,

  deleteModal: {
    isOpen: false,
    isLoading: false,
    constituency: null
  },

  fetchConstituencies: async () => {
        try {
            const [constituencyRes, regionRes] = await Promise.all([
            axios.get('http://127.0.0.1:8000/api/constituency'),
            axios.get('http://127.0.0.1:8000/api/regions')
            ]);
 
            const regionsMap = {};
            for (const region of regionRes.data.data) {
            regionsMap[region.id] = region.name;
            }

            const constituenciesWithRegionName = constituencyRes.data.data.map((c) => ({
            ...c,
            region_name: regionsMap[c.region_id] || 'Unknown Region'
            }));

            set({ constituencies: constituenciesWithRegionName });
        } catch (error) {
            console.error('Failed to fetch constituencies or regions', error);
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
