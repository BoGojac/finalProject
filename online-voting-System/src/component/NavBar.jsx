// //import React from 'react';
// import { useLocation } from 'react-router-dom';
// //import { ChevronLeft } from 'lucide-react';
// //import { useState } from 'react';
// import Avatar from './Avatar'; // Adjust the path if needed
// import profilePic from '../assets/proP.jpg';
// //import PropTypes from 'prop-types';

// const NavBar = () => {
//   const { pathname } = useLocation();

//   const pageTitle = pathname.toLowerCase().includes('admin')
//     ? 'Admin Dashboard'
//     : pathname.toLowerCase().includes('constituency')
//     ? 'Constituency Dashboard'
//     : pathname.toLowerCase().includes('boardmanagers')
//     ? 'Board Manager Dashboard'
//     : pathname.toLowerCase().includes('pollingstation')
//     ? 'Polling Station Dashboard'
//     : pathname.toLowerCase().includes('voters')
//     ? 'Voter Dashboard'
//     : pathname.toLowerCase().includes('candidates')
//     ? 'Candidate Dashboard'
//     : '';
    
//   const userType = pathname.toLowerCase().includes('admin')
//     ? 'Admin User'
//     : pathname.toLowerCase().includes('constituency')
//     ? 'Constituency User'
//     : pathname.toLowerCase().includes('boardmanagers')
//     ? 'Board-Manager User'
//     : pathname.toLowerCase().includes('pollingstation')
//     ? 'Polling-Station User'
//     : pathname.toLowerCase().includes('voters')
//     ? 'Voter User'
//     : pathname.toLowerCase().includes('candidates')
//     ? 'Candidate User'
//     : '';

//   return (
//     <nav className="relative flex justify-between items-center h-16 px-6 w-full shadow-sm z-10" style={{ backgroundColor: '#f4f4f4' }}>
//       {/* Sidebar Toggle */}
//       {/* <button
//         onClick={toggleSidebar}
//         className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border shadow-md rounded-full p-1 w-6 h-6 flex items-center justify-center"
//       > <ChevronLeft size={16} /> */}
// {/*        
//       </button> */}

//       {/* Logo */}
//       <div className="text-xl font-bold text-blue-900 tracking-wide">
//         NEBE
//       </div>

//       {/* Title */}
//       <div className="text-lg font-semibold text-gray-800">
//         {pageTitle}
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2">
//           <Avatar src={profilePic} fallback="AU" />
//           <span className="text-sm font-medium text-gray-700">{userType}</span>
//         </div>
//       </div>
//     </nav>
//   );
// };




// NavBar.propTypes = {
//   toggleSidebar: PropTypes.func.isRequired,
// };

// export default NavBar;

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Avatar from './Avatar';
import profilePic from '../assets/proP.jpg';
import PropTypes from 'prop-types';

const NavBar = ({ toggleSidebar, sidebarOpen }) => {
  const { pathname } = useLocation();

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

  return (
    <nav className="relative flex justify-between items-center h-16 px-6 w-full shadow-sm z-10" style={{ backgroundColor: '#f4f4f4' }}>
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border shadow-md rounded-full p-1 w-6 h-6 flex items-center justify-center"
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
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar src={profilePic} fallback="AU" />
          <span className="text-sm font-medium text-gray-700">{userType}</span>
        </div>
      </div>
    </nav>
  );
};
NavBar.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
    sidebarOpen: PropTypes.func.isRequired,
  };

export default NavBar;
