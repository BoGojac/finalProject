//import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const NavBar = () => {
  const { pathname } = useLocation();

    const pageTitle = pathname.toLowerCase().includes('admin')
    ? 'Admin Dashboard'
    : pathname.toLowerCase().includes('constituency')
    ? 'Constituency Dashboard'
    : pathname.toLowerCase().includes('board-managers')
    ? 'Board Manager Dashboard'
    : pathname.toLowerCase().includes('polling-station')
    ? 'Polling Station Dashboard'
    : pathname.toLowerCase().includes('voters')
    ? 'Voter Dashboard'
    : pathname.toLowerCase().includes('candidates')
    ? 'Candidate Dashboard'
    : '';
  return (
    <nav className="flex justify-between items-center h-16 px-6 bg-white shadow-md w-full" style={{backgroundColor:'#f4f4f4'   }}>
    <div className="text-2xl font-bold tracking-wide drop-shadow" style={{ color: 'rgb(4, 1, 35)' }}>
      {pageTitle}
    </div>
    <div className="flex items-center gap-6">
      <button className="relative hover:text-blue-900 transition">
        <Bell size={24} />
      </button>
      <button className="hover:text-blue-900 transition">
        <User size={24} />
      </button>
    </div>
  </nav>  
  );
};

export default NavBar;
