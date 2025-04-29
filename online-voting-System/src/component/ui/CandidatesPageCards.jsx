//import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  // Calendar,
  // Clock,
  // Undo2,
  AlertCircle,
} from "lucide-react";

const CandidatesPageCards = () => {
  const navigate = useNavigate();

  // Static data - replace with API calls later
  const stats = {
    constituencies: 24,
    pollingStations: 187,
    parties: 12
  };

  const cards = [
    {
      title: "View Candidates",
      description: (
        <div className="space-y-1">
          <p>Establish new electoral constituencies</p>
          <div className="text-xs text-gray-500 pt-2">
            Current: {stats.constituencies} constituencies
          </div>
        </div>
      ),
      icon: <List className="text-blue-600" size={28} />,
      path: '/candidates/view-candidates',

    },
    {
      title: "View Voters",
      description: (
        <div className="space-y-1">
          <p>Set up new voting locations</p>
          <div className="text-xs text-gray-500 pt-2">
            Current: {stats.pollingStations} polling stations
          </div>
        </div>
      ),
      icon: <List className="text-green-600" size={28} />,
      path: '/candidates/view-voters',
    },
    {
      title: "Complain Submission",
      description: (
        <div className="space-y-1">
          <p>Register new political parties</p>
          <div className="text-xs text-gray-500 pt-2">
            Current: {stats.parties} parties
          </div>
        </div>
      ),
      icon: <AlertCircle className="text-purple-600" size={28}/>,
      path: '/candidates/complain',
    },
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
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(card.path)}
          >
            <div className="flex items-center gap-4 mb-3">
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

export default CandidatesPageCards;