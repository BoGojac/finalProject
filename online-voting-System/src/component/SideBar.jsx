// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, NotepadText, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();

  const adminLinks = [
    { to: '/admin/manage-user', label: 'Manage User', icon: <Users size={18} /> },
    { to: '/admin/view-override-history', label: 'View Override History', icon: <Users size={18} /> },
    { to: '/admin/Setting', label: 'Setting', icon: <Settings size={18} /> },
  ];
  
  const constituencyLinks = [
    { to: '/constituency/register-candidate', label: 'Register Candidate', icon: <Users size={18} /> },
    { to: '/constituency/view-candidates', label: 'Registered Candidate', icon: <Users size={18} /> },
    { to: '/constituency/view-voters', label: 'Registered Voter', icon: <Users size={18} /> },
    { to: '/constituency/result', label: 'View Result', icon: <NotepadText size={18} /> },
    { to: '/constituency/setting', label: 'Setting', icon: <Settings size={18} /> },
  ];
  
  const boardManagerLinks = [
    { to: '/board-managers/create-constituency', label: 'Create Constituency', icon: <Users size={18} /> },
    { to: '/board-managers/create-polling-station', label: 'Create Polling Station', icon: <Users size={18} /> },
    { to: '/board-managers/set-registration-timespan', label: 'Set Registration Timespan', icon: <Settings size={18} /> },
    { to: '/board-managers/set-voting-date', label: 'Set Voting Date', icon: <Settings size={18} /> },
    { to: '/board-managers/view-voters', label: 'View Voters', icon: <Users size={18} /> },
    { to: '/board-managers/view-candidates', label: 'View Candidates', icon: <Users size={18} /> },
    { to: '/board-managers/result', label: 'View Result', icon: <NotepadText size={18} /> },
    { to: '/board-managers/setting', label: 'Setting', icon: <Settings size={18} /> },
  ];
  
  const pollingStationLinks = [
    { to: '/polling-station/register-voter', label: 'Register Voter', icon: <Users size={18} /> },
    { to: '/polling-station/view-voters', label: 'View Voters', icon: <Users size={18} /> },
    { to: '/polling-station/view-candidates', label: 'View Candidates', icon: <Users size={18} /> },
    { to: '/polling-station/result', label: 'View Result', icon: <NotepadText size={18} /> },
    { to: '/polling-station/setting', label: 'Setting', icon: <Settings size={18} /> },
  ];
  
  const votersLinks = [
    { to: '/voters/view-candidates', label: 'View Candidates', icon: <Users size={18} /> },
    { to: '/voters/view-voters', label: 'View Voters', icon: <Users size={18} /> },
    { to: '/voters/result', label: 'View Result', icon: <NotepadText size={18} /> },
    { to: '/voters/setting', label: 'Setting', icon: <Settings size={18} /> },
  ];
  
  const candidatesLinks = [
    { to: '/candidates/view-voters', label: 'View Voters', icon: <Users size={18} /> },
    { to: '/candidates/view-candidates', label: 'View Candidates', icon: <Users size={18} /> },
    { to: '/candidates/complain', label: 'Complain Submission', icon: <NotepadText size={18} /> },
    { to: '/candiadtes/setting', label: 'Setting', icon: <Settings size={18} /> },
  ];
  

  const linksToRender =
  pathname.toLowerCase().includes('admin') ? adminLinks :
  pathname.toLowerCase().includes('constituency') ? constituencyLinks :
  pathname.toLowerCase().includes('board-managers') ? boardManagerLinks :
  pathname.toLowerCase().includes('polling-station') ? pollingStationLinks :
  pathname.toLowerCase().includes('voters') ? votersLinks :
  pathname.toLowerCase().includes('candidates') ? candidatesLinks :
  [];


  return (
    <aside className="w-64 h-screen text-white flex flex-col p-4" style={{ backgroundColor: 'rgb(4, 1, 35)' }}>
      <div className="flex flex-col items-center mb-4 mt-2">
      <img src=".../assets/NEBE LOGO-01.svg" alt=""  className="w-8 h-8 sm:w-12 sm:h-12 text-[#46c6dd] mb-4 group-hover:scale-110 transition-transform duration-300"/>
        
        <div className="w-full mt-4">
          <hr className="border-gray-600" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <nav>
          {linksToRender.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition-all duration-300 ${
                pathname === to ? 'bg-blue-700' : ''
              }`}
            >
              {icon}
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <div className="w-full mt-4">
          <hr className="border-gray-600" />
        </div>
        <Link
          to="/"
          className="flex items-center gap-3 p-3 mt-6 text-white hover:text-red-500 transition-all duration-300"
        >
          <LogOut size={18} />
          <span>LogOut</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
