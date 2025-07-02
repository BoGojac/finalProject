import { useNavigate } from 'react-router-dom';
import {
  Vote,
  UserSearch,
  Users,
  PieChart
} from "lucide-react";

const VoterPageCards = () => {
  const navigate = useNavigate();

  // Static data - replace with API calls later
  const stats = {
    totalCandidates: 42,
    registeredVoters: 1250,
    votingCenters: 18
  };

  const cards = [
    {
      title: "Cast Your Vote",
      description: (
        <div className="space-y-1">
          <p>Participate in the ongoing election</p>
          <div className="text-xs text-gray-500 pt-2">
            Your vote matters - make it count!
          </div>
        </div>
      ),
      icon: <Vote className="text-green-600" size={28} />,
      path: '/VotersPage/vote'
    },
    {
      title: "View Candidates",
      description: (
        <div className="space-y-1">
          <p>Browse all candidates in your constituency</p>
          <div className="text-xs text-gray-500 pt-2">
            {stats.totalCandidates} candidates registered
          </div>
        </div>
      ),
      icon: <UserSearch className="text-purple-600" size={28} />,
      path: '/VotersPage/register-candidate'
    },
    {
      title: "View Voters",
      description: (
        <div className="space-y-1">
          <p>See registered voters in your constituency</p>
          <div className="text-xs text-gray-500 pt-2">
            {stats.registeredVoters} voters in your area
          </div>
        </div>
      ),
      icon: <Users className="text-orange-600" size={28} />,
      path: '/VotersPage/view-voters'
    },
    {
      title: "Election Results",
      description: (
        <div className="space-y-1">
          <p>View the results of historical election</p>
          <div className="text-xs text-gray-500 pt-2">
            Get result as soon as voting completed
          </div>
        </div>
      ),
      icon: <PieChart className="text-red-600" size={28} />,
      path: '/VotersPage/result'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
            onClick={() => handleCardClick(card.path)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-left flex-1">{card.title}</h3>
              <div className="p-2 bg-gray-100 rounded-lg">{card.icon}</div>
            </div>
            <div className="text-sm text-gray-600">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoterPageCards;