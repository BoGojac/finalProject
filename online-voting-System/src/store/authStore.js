// src/store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  admin: null,
  board_manager: null,
  constituency_staff: null,
  login: (user, token, admin, board_manager, constituency_staff) =>
    set({ user: user, 
          token: token, 
          isAuthenticated: true, 
          admin: admin, 
          board_manager: board_manager, 
          constituency_staff: constituency_staff, }),
  logout: () =>
    set({ user: null, 
          token: null, 
          isAuthenticated: false,
          admin: null, 
          board_manager: null, 
          constituency_staff: null, }),
}));

export default useAuthStore;
