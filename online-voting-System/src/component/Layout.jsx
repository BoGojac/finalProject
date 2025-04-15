import PropTypes from 'prop-types';
import { useState } from 'react';
import NavBar from './NavBar';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        <NavBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
