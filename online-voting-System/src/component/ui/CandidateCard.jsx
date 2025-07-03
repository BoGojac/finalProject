// import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';

const CandidateCard = ({ candidate, selectedId, onSelect }) => {
  const isSelected = selectedId === candidate.id;

  return (
    <div
      className={`relative p-4 rounded-2xl border-2 shadow-md transition-all cursor-pointer ${
        isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-purple-400'
      }`}
      onClick={onSelect}
    >
      {/* Selection Checkmark */}
      {isSelected && (
        <FaCheckCircle className="absolute top-2 right-2 text-green-600 text-xl" />
      )}

      {/* Candidate Image */}
      <div className="flex justify-center mb-4">
        {candidate.image ? (
          <img
            src={`http://localhost:8000/storage/${candidate.image}`}
            alt="Candidate"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-lg">
            No Image
          </div>
        )}
      </div>

      {/* Candidate Info */}
      <div className="text-center">
        <h3 className="text-xl font-bold mb-1">
          {candidate.first_name} {candidate.middle_name || ''} {candidate.last_name}
        </h3>
        <p className="text-sm text-gray-600">{candidate.gender}</p>
        <p className="text-sm text-gray-600 mt-1">
          Type: {candidate.candidate_type}
        </p>
          {candidate.party && (
            <div className="flex items-center justify-center gap-2 mt-1">
              {candidate.party.image && (
                <img
                  src={`http://localhost:8000/storage/${candidate.party.image}`}
                  alt={candidate.party.abbrevation}
                  className="w-6 h-6 rounded-full object-cover border border-gray-300"
                />
              )}
              <p className="text-sm text-purple-600 font-medium">
                {candidate.party.name} ({candidate.party.abbrevation})
              </p>
            </div>
          )}
        </div>
    </div>
  );
};

CandidateCard.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    middle_name: PropTypes.string,
    last_name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    candidate_type: PropTypes.string.isRequired,
    image: PropTypes.string,
    party: PropTypes.shape({
      name: PropTypes.string,
      abbrevation: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
  selectedId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default CandidateCard;


