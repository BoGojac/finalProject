//import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  History,
} from "lucide-react";

const AdminPageCards = () => {
  const navigate = useNavigate();

  // Static user data - replace with real API calls later
  const userStats = {
    totalUsers: 42,
    activeUsers: 36,
  };

  const cards = [
    {
      title: "User Management",
      description: (
        <div className="space-y-1">
          <p>Create, update, and access control users</p>
          <div className="flex justify-evenly text-xs text-gray-500 pt-2">
            <span>Total: {userStats.totalUsers}</span>
            <span>Active: {userStats.activeUsers}</span>
          </div>
        </div>
      ),
      icon: <Users className="text-blue-600" size={28} />,
      path: "/Admin/manage-user"
    },
    {
      title: "View Override History",
      description: "View voting override history",
      icon: <History className="text-green-600" size={28} />,
      path: "/Admin/view-override-history"
    },
    {
      title: "System Log",
      description: "View detailed system activity logs",
      icon: <FileText className="text-purple-600" size={28} />,
      path: "/Admin/database-management"
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

export default AdminPageCards;