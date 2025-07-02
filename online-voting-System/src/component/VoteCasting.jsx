import { useState } from 'react';
import CandidateCard from './ui/CandidateCard.jsx';
import { useNavigate } from 'react-router-dom';
import aliImage from '../assets/candidates image/ali.jpg';
import saraImage from '../assets/candidates image/sara.jpg';
import fanaImage from '../assets/candidates image/fana.jpg';
import abinetImage from '../assets/candidates image/abinet.jpg';
import partyLogo from '../assets/candidates image/party.png';
import EzemaLogo from '../assets/candidates image/Ezema.png';

const MOCK_VOTER = {
  id: 1,
  name: "Demo Voter",
  constituency_id: 101,
  voting_status: localStorage.getItem('hasVoted') === 'true' ? 'voted' : 'pending'
};

const MOCK_CANDIDATES = [
  {
    id: 1,
    first_name: "Ali",
    middle_name: "Mohammed",
    last_name: "Nur",
    image_url: aliImage,
    party: { name: "Prosperty Party", logo_url: partyLogo },
    constituency_id: 101
  },
  {
    id: 2,
    first_name: "Sara",
    middle_name: "Tesfaye",
    last_name: "Alemu",
    image_url: saraImage,
    party: null,
    constituency_id: 101
  },
  {
    id: 3,
    first_name: "Fana",
    middle_name: "Shitaye",
    last_name: "Alemu",
    image_url: fanaImage,
    party: { name: "Ezema Party", logo_url: EzemaLogo },
    constituency_id: 101
  },
   {
    id: 4,
    first_name: "Abinet",
    middle_name: "Gebre",
    last_name: "Tisianew",
    image_url: abinetImage,
    party: null,
    constituency_id: 101
  },
];

const VoteCasting = () => {
  const [hasVoted, setHasVoted] = useState(MOCK_VOTER.voting_status === 'voted');
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [confirmVote, setConfirmVote] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const selectedCandidate = MOCK_CANDIDATES.find(c => c.id === selectedCandidateId);

  const handleVoteClick = () => {
    if (!selectedCandidateId) {
      setShowWarning(true);
      return;
    }
    setConfirmVote(true);
  };

  const submitVote = () => {
    localStorage.setItem('hasVoted', 'true');
    setHasVoted(true);
    setConfirmVote(false);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate('/VotersPage');
    window.location.reload();
  };

  if (hasVoted && !showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white border-4 border-purple-500 shadow-lg p-8 rounded-2xl w-[600px] min-h-[250px] text-center text-red-500 text-3xl flex items-center justify-center">
          <h3>&quot;You have already voted. You can&#39;t vote twice in the same election.&quot;</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOCK_CANDIDATES.map(candidate => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          selectedId={selectedCandidateId}
          onSelect={() => setSelectedCandidateId(candidate.id)}
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
        <div className="fixed inset-0 bg-transparent bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl border-2 border-red-500 text-red-600 w-[400px] shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">No Candidate Selected</h2>
            <p className="mb-6">Please select a candidate before voting.</p>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmVote && selectedCandidate && (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl border-4 border-purple-600 w-[500px] shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Confirm Your Vote</h2>
            <p className="mb-6">
              Are you sure you want to vote for{' '}
              <span className="font-semibold text-black">
                {selectedCandidate.first_name} {selectedCandidate.middle_name} {selectedCandidate.last_name}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={submitVote}
                className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-500"
              >
                Yes, Vote
              </button>
              <button
                onClick={() => setConfirmVote(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-transparet bg-opacity-30 z-50 flex justify-center items-center">
          <div className="bg-white border-4 border-green-600 shadow-lg p-8 rounded-2xl w-[600px] text-center text-green-600 text-2xl">
            <h3 className="mb-4">✅ Your vote has been successfully submitted!</h3>
            <button
              onClick={closeSuccess}
              className="mt-6 bg-purple-800 text-white px-6 py-2 rounded hover:bg-purple-500"
            >
              Go to Voter Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteCasting;
