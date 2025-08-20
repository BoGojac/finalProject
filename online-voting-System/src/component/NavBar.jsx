import { ChevronLeft, ChevronRight, Menu, LogOut, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import profilePic from '../assets/proP.jpg';
import PropTypes from 'prop-types';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore'; // 👈 Import UI store

const NavBar = ({ toggleSidebar, sidebarOpen, isMobile }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const showDropdown = useUIStore((state) => state.showDropdown);
  const toggleDropdown = useUIStore((state) => state.toggleDropdown);
  const setShowDropdown = useUIStore((state) => state.setShowDropdown);

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user); // 👈 get user from auth store

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

  const handleProfileClick = () => {
    const parts = pathname.split('/');
    const rolePrefix = parts[1];
    if (rolePrefix) {
      navigate(`/${rolePrefix}/profile`);
    } else {
      console.warn('No valid role route prefix found.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="relative flex items-center justify-between h-16 px-4 sm:px-6 w-full shadow-sm z-30 bg-white">
      {/* Left side */}
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

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4 relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="hidden sm:block text-sm text-gray-600">
            {userType}
          </div>
          <Avatar src={profilePic} fallback="AU" size="sm" />
        </div>

        {showDropdown && (
          <div className="absolute right-0 top-12 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Avatar src={profilePic} fallback="AU" size="sm" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{userType}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'No email'}</p> {/* ✅ fix typo emali -> email */}
                </div>
              </div>
            </div>
            <div className="py-1">
              <button
                onClick={handleProfileClick}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-3" />
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-red-500"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
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
