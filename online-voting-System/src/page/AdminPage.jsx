import {
  Users,
  FileText,
  Database,
  BarChart2,
  Settings,
} from "lucide-react";

const AdminPage = () => {
  const cards = [
    {
      title: "User Management",
      description: "Create, update, and access control users",
      icon: <Users className="text-blue-600" size={28} />,
    },
    {
      title: "System Logs",
      description: "View detailed system activity logs",
      icon: <FileText className="text-green-600" size={28} />,
    },
    {
      title: "Database Management",
      description: "Monitor and optimize database performance",
      icon: <Database className="text-purple-600" size={28} />,
    },
    {
      title: "Analytics Dashboard",
      description: "View system usage statistics and metrics",
      icon: <BarChart2 className="text-indigo-600" size={28} />,
    },
    {
      title: "System Configuration",
      description: "Configure global system settings",
      icon: <Settings className="text-red-600" size={28} />,
    },
  ];

  return (
    <div className="p-6 overflow-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <div className="p-2 bg-gray-100 rounded-full">{card.icon}</div>
            </div>
            <p className="text-sm text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
