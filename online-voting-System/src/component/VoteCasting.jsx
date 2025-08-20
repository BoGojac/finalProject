import { useEffect } from 'react';
import axios from 'axios';
import CandidateCard from './ui/CandidateCard.jsx';
import { useNavigate } from 'react-router-dom';
import useVoteStore from '../store/voteStore';
import useAuthStore from '../store/authStore';

const VoteCasting = () => {

  const token = useAuthStore((state) => state.token);

  const {
    candidates,
    setCandidates,
    selectedCandidateId,
    selectCandidate,
    hasVoted,
    setHasVoted,
    toggleWarning,
    toggleConfirmVote,
    toggleSuccess,
    showSuccess,
    showWarning,
    confirmVote,
  } = useVoteStore();

  const navigate = useNavigate();

     useEffect(() => {
      const voterId = useAuthStore.getState().voter?.id;
      const token = useAuthStore.getState().token;

      if (!voterId || !token) return;

      axios.get(`http://127.0.0.1:8000/api/voter/${voterId}/has-voted`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then((res) => {
          setHasVoted(res.data.has_voted);
        })
        .catch((err) => {
          console.error('Failed to fetch vote status:', err);
        });
    }, [setHasVoted]);


  useEffect(() => {
    if (!token) return; // ✅ guard in case token is missing

    axios.get('http://127.0.0.1:8000/api/voter/candidates', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        setCandidates(res.data.candidates);
      })
      .catch((err) => {
        console.error('Failed to fetch candidates:', err);
      });
  }, [token, setCandidates]);

  const handleVoteClick = () => {
    if (!selectedCandidateId) {
      toggleWarning(true);
      return;
    }
    toggleConfirmVote(true);
  };



  const handleSubmitVote = async () => {
    try {
      const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
      console.log("Selected candidate object:", selectedCandidate);

      const voterId = useAuthStore.getState().voter?.id;
      const votingDateId = useAuthStore.getState().user?.voting_date_id;

      console.log('Sending vote payload:', {
        voting_date_id: votingDateId,
        candidate_id: selectedCandidate.id,
        voter_id: voterId,
      });

      if (!votingDateId || !selectedCandidate.id || !voterId) {
        console.error('Missing required vote data');
        toggleWarning(true);
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/vote-counts',
        {
          voting_date_id: votingDateId,
          candidate_id: selectedCandidateId,
          voter_id: voterId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      console.log('Vote cast:', response.data);
      setHasVoted('true');
      toggleConfirmVote(false);
      toggleSuccess(true);
    } catch (error) {
      console.error('Error casting vote:', error);
      if (error.response?.data) {
        console.error('Validation errors:', error.response.data.errors);
      }
      toggleConfirmVote(false);
      toggleWarning(true);
    }
  };


  const handleCloseSuccess = () => {
    toggleSuccess(false);
    navigate('/VotersPage');
    window.location.reload();
  };

  if (hasVoted && !showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white border-4 border-purple-500 shadow-lg p-8 rounded-2xl w-[600px] min-h-[250px] text-center text-red-500 text-3xl flex items-center justify-center">
          <h3>
            &quot;You have already voted. You can&apos;t vote twice in the same election.&quot;
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          selectedId={selectedCandidateId}
          onSelect={() => selectCandidate(candidate.id)}
        />
      ))}

      <div className="col-span-full text-center mt-4">
        <button
          onClick={handleVoteClick}
          className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Vote
        </button>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg text-center w-80">
            <p className="text-red-600 font-semibold mb-4">Please select a candidate before voting.</p>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => toggleWarning(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirm Vote Modal */}
      {confirmVote && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg text-center w-96">
            <p className="text-lg font-semibold mb-4">Are you sure you want to cast your vote?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSubmitVote}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
              >
                Confirm
              </button>
              <button
                onClick={() => toggleConfirmVote(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg text-center w-96">
            <p className="text-green-600 font-bold text-lg mb-4">Vote cast successfully!</p>
            <button
              onClick={handleCloseSuccess}
              className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteCasting;
