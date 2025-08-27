// src/store/votingDateStore.js
import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const useVotingDateStore = create((set) => ({
  votingDates: [],
  fetchVotingDates: async () => {
     const { token } = useAuthStore.getState();
  const res = await axios.get('http://127.0.0.1:8000/api/voting-date', {
        headers: { Authorization: `Bearer ${token}` } // include token
      });
//   console.log('Fetched voting dates:', res.data); // Inspect this
  set({ votingDates: res.data.data }); // adjust this if needed
}
}));


export default useVotingDateStore;
