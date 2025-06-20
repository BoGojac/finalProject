import { ChevronLeft, ChevronRight, Menu, RefreshCcw, LogOut, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import Avatar from './Avatar';
import profilePic from '../assets/proP.jpg';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';


const NavBar = ({ toggleSidebar, sidebarOpen, isMobile }) => {
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


  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate('/login'); // or navigate('/login') if that’s your login route
  };


  return (
    <nav className="relative flex items-center justify-between h-16 px-4 sm:px-6 w-full shadow-sm z-30 bg-white">
      {/* Left side - Sidebar toggle and breadcrumbs */}
      <div className="flex items-center">
        {isMobile ? (
          <button
            onClick={toggleSidebar}
            className="mr-2 p-1 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}
        
        <div className="text-lg font-semibold text-gray-800 truncate max-w-xs sm:max-w-md md:max-w-lg">
          {pageTitle}
        </div>
      </div>

      {/* Right side - User dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 relative">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="hidden sm:block text-sm text-gray-600">
            {userType}
          </div>
          <Avatar src={profilePic} fallback="AU" size="sm" />
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
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
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-3" />
                My Profile
              </Link>
              <Link
                to="/change-password"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <RefreshCcw className="w-4 h-4 mr-3"/>
                Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
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
  isMobile: PropTypes.bool.isRequired,
};

export default NavBar;