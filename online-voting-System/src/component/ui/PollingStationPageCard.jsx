import { useNavigate } from 'react-router-dom';
import { UserPlus, List, BarChart2 } from "lucide-react";

const PollingStationPageCards = () => {
  const navigate = useNavigate();

  // Mock data - replace with real data from your API
  const stats = {
    registeredVoters: 1250,
    candidates: 18,
    resultsReady: true
  };

  const cards = [
    {
      title: "Register Voter",
      description: (
        <div className="space-y-1">
          <p>Register new voters at your polling station</p>
          <div className="text-xs text-gray-500 pt-2">
            <span>Total Registered: {stats.registeredVoters}</span>
          </div>
        </div>
      ),
      icon: <UserPlus className="text-blue-600" size={28} />,
      path: "/PollingStation/register-voter"
    },
    {
      title: "View Candidates",
      description: (
        <div className="space-y-1">
          <p>View all candidates in your constituency</p>
          <div className="text-xs text-gray-500 pt-2">
            <span>Total Candidates: {stats.candidates}</span>
          </div>
        </div>
      ),
      icon: <List className="text-green-600" size={28} />,
      path: "/PollingStation/view-candidate"
    },
    {
      title: "View Results",
      description: (
        <div className="space-y-1">
          <p>View election results for your polling station</p>
          <div className="text-xs text-gray-500 pt-2">
            <span>Status: {stats.resultsReady ? 'Available' : 'Pending'}</span>
          </div>
        </div>
      ),
      icon: <BarChart2 className="text-purple-600" size={28} />,
      path: "/pollingstation/result"
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6 overflow-auto h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
            onClick={() => handleCardClick(card.path)}
          >
            <div className="flex items-center gap-15 mb-3">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <div className="p-2 bg-gray-100 rounded-full">{card.icon}</div>
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

export default PollingStationPageCards;