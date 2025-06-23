// store/userStore.js

import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  users: [],
  isAddFormOpen: false,
  isEditFormOpen: false,
  selectedUser: null,

  fetchUsers: async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/user');
      set({ users: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),

  openEditForm: (user) => set({ isEditFormOpen: true, selectedUser: user }),
  closeEditForm: () => set({ isEditFormOpen: false, selectedUser: null }),
}));

export default useUserStore;
