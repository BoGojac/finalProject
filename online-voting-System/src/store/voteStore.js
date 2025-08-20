// store/voteStore.js
import { create } from 'zustand';


const useVoteStore = create((set) => ({
    
  candidates: [],
  selectedCandidateId: null,
  hasVoted: false,
  showWarning: false,
  confirmVote: false,
  showSuccess: false,

  
  setCandidates: (candidates) => set({ candidates }),
  selectCandidate: (id) => set({ selectedCandidateId: id }),
  setHasVoted: (voted) => {
    set({ hasVoted: voted });
  },
  toggleWarning: (value) => set({ showWarning: value }),
  toggleConfirmVote: (value) => set({ confirmVote: value }),
  toggleSuccess: (value) => set({ showSuccess: value }),
}));

export default useVoteStore;
