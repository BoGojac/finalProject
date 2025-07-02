// src/store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  admin: null,
  board_manager: null,
  constituency_staff: null,
  polling_station_staff: null,
  candidate:null,
  voter:null,
  login: (user, token, admin, board_manager, constituency_staff, polling_station_staff, candidate, voter, ) =>
    set({ user: user, 
          token: token, 
          isAuthenticated: true, 
          admin: admin, 
          board_manager: board_manager, 
          constituency_staff: constituency_staff,
          polling_station_staff: polling_station_staff,
          candidate: candidate,
          voter: voter, }),
  logout: () =>
    set({ user: null, 
          token: null, 
          isAuthenticated: false,
          admin: null, 
          board_manager: null, 
          constituency_staff: null, }),
}));

export default useAuthStore;
