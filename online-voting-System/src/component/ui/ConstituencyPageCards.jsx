//import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Users,
  BarChart2,
} from "lucide-react";

const ConstituencyPageCards = () => {
  const navigate = useNavigate();

  // Mock data - replace with real API calls
  const stats = {
    totalCandidates: 42,
    constituencyCandidates: 15,
    totalVoters: 1250,
    constituencyVoters: 380
  };

  const cards = [
    {
      title: "Register Candidate",
      description: "Register new candidates for your constituency",
      icon: <UserPlus className="text-blue-600" size={28} />,
      path: "/ConstituencyManagers/register-candidate"
    },
    {
      title: "View Voters",
      description: (
        <div className="space-y-1">
          <p>View registered voters in your constituency</p>
          <div className="flex justify-evenly text-xs text-gray-500 pt-2">
            <span>In Constituency: {stats.constituencyVoters}</span>
            <span>Total: {stats.totalVoters}</span>
          </div>
        </div>
      ),
      icon: <Users className="text-purple-600" size={28} />,
      path: "/ConstituencyManagers/view-voters"
    },
    {
      title: "View Result",
      description: "View election results for your constituency",
      icon: <BarChart2 className="text-indigo-600" size={28} />,
      path: "/ConstituencyManagers/result"
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
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(card.path)}
          >
            <div className="flex items-center gap-10 mb-3">
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

export default ConstituencyPageCards;