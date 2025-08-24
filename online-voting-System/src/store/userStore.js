// // store/userStore.js

// import { create } from 'zustand';
// import axios from 'axios';

// const useUserStore = create((set) => ({
//   users: [],
//   isAddFormOpen: false,
//   isEditFormOpen: false,
//   selectedUser: null,
//   pagination: null,


//   fetchUsers: async (page = 1) => {
//     try {
//       const res = await axios.get(`http://127.0.0.1:8000/api/user?page=${page}`);
//       set({
//         users: res.data.data,
//         pagination: {
//           current_page: res.data.current_page,
//           last_page: res.data.last_page,
//           per_page: res.data.per_page,
//           total: res.data.total,
//         }
//       });
//     } catch (e) {
//       console.error(e);
//       set({ users: [], pagination: null });
//     }
//   },


//   openAddForm: () => set({ isAddFormOpen: true }),
//   closeAddForm: () => set({ isAddFormOpen: false }),

//   openEditForm: (user) => set({ isEditFormOpen: true, selectedUser: user }),
//   closeEditForm: () => set({ isEditFormOpen: false, selectedUser: null }),
// }));

// export default useUserStore;


// store/userStore.js
import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set, get) => ({
  users: [],
  pagination: null,
  isAddFormOpen: false,
  isEditFormOpen: false,
  selectedUser: null,

  fetchUsers: async (page = 1) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/user?page=${page}`);
      set({
        users: res.data.data,
        pagination: {
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          per_page: res.data.per_page,
          total: res.data.total,
        }
      });
    } catch (e) {
      console.error(e);
      set({ users: [], pagination: null });
    }
  },

  // ✅ Derived state: compute counts
  getTotalUsers: () => {
    const { pagination } = get();
    return pagination ? pagination.total : 0;
  },
  getActiveUsers: () => {
    const { users } = get();
    return users.filter(u => u.status === "active").length;
  },

  openAddForm: () => set({ isAddFormOpen: true }),
  closeAddForm: () => set({ isAddFormOpen: false }),

  openEditForm: (user) => set({ isEditFormOpen: true, selectedUser: user }),
  closeEditForm: () => set({ isEditFormOpen: false, selectedUser: null }),
}));

export default useUserStore;
