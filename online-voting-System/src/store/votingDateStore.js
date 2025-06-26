// src/store/votingDateStore.js
import { create } from 'zustand';
import axios from 'axios';

const useVotingDateStore = create((set) => ({
  votingDates: [],
  fetchVotingDates: async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/voting-date');
//   console.log('Fetched voting dates:', res.data); // Inspect this
  set({ votingDates: res.data.data }); // adjust this if needed
}
}));


export default useVotingDateStore;
