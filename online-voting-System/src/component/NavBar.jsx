import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import Avatar from './Avatar';
import profilePic from '../assets/proP.jpg';
import PropTypes from 'prop-types';
import { LogOut, User } from 'lucide-react';

const NavBar = ({ toggleSidebar, sidebarOpen }) => {
  const { pathname } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const pageTitle = pathname.toLowerCase().includes('admin')
    ? 'Admin Dashboard'
    : pathname.toLowerCase().includes('constituency')
    ? 'Constituency Dashboard'
    : pathname.toLowerCase().includes('boardmanagers')
    ? 'Board Manager Dashboard'
    : pathname.toLowerCase().includes('pollingstation')
    ? 'Polling Station Dashboard'
    : pathname.toLowerCase().includes('voters')
    ? 'Voter Dashboard'
    : pathname.toLowerCase().includes('candidates')
    ? 'Candidate Dashboard'
    : '';

  const userType = pathname.toLowerCase().includes('admin')
    ? 'Admin User'
    : pathname.toLowerCase().includes('constituency')
    ? 'Constituency User'
    : pathname.toLowerCase().includes('boardmanagers')
    ? 'Board-Manager User'
    : pathname.toLowerCase().includes('pollingstation')
    ? 'Polling-Station User'
    : pathname.toLowerCase().includes('voters')
    ? 'Voter User'
    : pathname.toLowerCase().includes('candidates')
    ? 'Candidate User'
    : '';

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="relative flex justify-between items-center h-16 px-6 w-full shadow-sm z-10" style={{ backgroundColor: '#f4f4f4' }}>
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-1 w-6 h-6 flex items-center justify-center"
      >
        {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo */}
      <div className="text-xl font-bold text-blue-900 tracking-wide">
        NEBE
      </div>

      {/* Title */}
      <div className="text-lg font-semibold text-gray-800">
        {pageTitle}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative">
        <div 
          className="self-center gap-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <Avatar src={profilePic} fallback="AU" />
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Avatar src={profilePic} fallback="AU" size="sm" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{userType}</p>
                  <p className="text-xs text-gray-500">admin@nebe.org</p>
                </div>
              </div>
            </div>
            <div className="py-1">
              <p
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-3" />
                name
              </p>
              <Link
                to="/logout"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-200"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
};

NavBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

export default NavBar;