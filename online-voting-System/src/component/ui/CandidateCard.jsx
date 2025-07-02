import PropTypes from 'prop-types';

const CandidateCard = ({ candidate, selectedId, onSelect }) => {
  return (
    <div className={`border rounded-xl p-4 shadow ${selectedId === candidate.id ? 'border-green-500' : 'border-gray-300'}`}>
      <img
        src={candidate.image_url}
        alt="Candidate"
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-xl font-bold text-center">
        {candidate.first_name} {candidate.middle_name} {candidate.last_name}
      </h3>
      {candidate.party ? (
        <div className="flex items-center justify-center gap-2 mt-2">
          <img src={candidate.party.logo_url} alt="Party Logo" className="w-6 h-6" />
          <span>{candidate.party.name}</span>
        </div>
      ) : (
        <div className="text-center text-sm text-gray-500 mt-2">Independent</div>
      )}
      <div className="flex items-center justify-center mt-3">
        <input
          type="radio"
          name="candidate"
          className="accent-purple-600 w-5 h-5"
          checked={selectedId === candidate.id}
          onChange={onSelect}
        />
      </div>
    </div>
  );

};

CandidateCard.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    middle_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    party: PropTypes.shape({
      name: PropTypes.string,
      logo_url: PropTypes.string
    }),
  }).isRequired,
  selectedId: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};


export default CandidateCard;
