import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/NEBELOGO.svg';
import {
	AlertCircle,
	BarChart2,
	CalendarCheck,
	CalendarRange,
	FileText,
	Home,
	LayoutDashboard,
	List,
	Map,
	UserPlus,
	Users,
	Undo2,
	UserSearch,
	Vote,
	NotebookPen,
} from 'lucide-react';
const Sidebar = ({ sidebarOpen, isMobile, toggleSidebar }) => {
    const { pathname } = useLocation();

	const adminLinks = [
		{
			to: '/admin',
			label: 'Dashboard',
			icon: <LayoutDashboard size={18} />,
		},
		{
			to: '/admin/manage-user',
			label: 'Manage User',
			icon: <Users size={18} />,
		},
		{
			to: '/admin/view-override-history',
			label: 'View Override History',
			icon: <FileText size={18} />,
		},
	];

	const constituencyLinks = [
		{
			to: '/ConstituencyManagers',
			label: 'Dashboard',
			icon: <LayoutDashboard size={18} />,
		},
		{
			to: '/ConstituencyManagers/register-candidate',
			label: 'Register Candidate',
			icon: <UserPlus size={18} />,
		},
		{
			to: '/ConstituencyManagers/view-voters',
			label: 'View Voters',
			icon: <List size={18} />,
		},
		{
			to: '/ConstituencyManagers/result',
			label: 'View Result',
			icon: <BarChart2 size={18} />,
		},
	];

	const boardManagerLinks = [
		{
			to: '/boardmanagers',
			label: 'Dashboard',
			icon: <LayoutDashboard size={18} />,
		},
		{
			to: '/boardmanagers/create-constituency',
			label: 'Create Constituency',
			icon: <Map size={18} />, // Represents geographic division
		},
		{
			to: '/boardmanagers/create-polling-station',
			label: 'Create Polling Station',
			icon: <Home size={18} />, // Represents a physical location
		},
		{
			to: '/boardmanagers/register-party',
			label: 'Register Party ',
			icon: <NotebookPen size={18} />,
		},
		{
			to: '/boardmanagers/set-registration-timespan',
			label: 'Set Registration Timespan',
			icon: <CalendarRange size={18} />, // Indicates date ranges
		},
		{
			to: '/boardmanagers/set-voting-date',
			label: 'Set Voting Date',
			icon: <CalendarCheck size={18} />, // Specific date selection
		},
		{
			to: '/boardmanagers/view-voters',
			label: 'View Voters',
			icon: <List size={18} />, // Verified users
		},
		{
			to: '/boardmanagers/view-candidates',
			label: 'View Candidates',
			icon: <List size={18} />, // Group of people
		},
		{
			to: '/boardmanagers/result',
			label: 'View Result',
			icon: <BarChart2 size={18} />, // Better for analytics
		},
		{
			to: '/boardmanagers/override-voting',
			label: 'Override Voting',
			icon: <Undo2 size={18} />,
		},
		{
			to: '/boardmanagers/view-override-history',
			label: 'View Override History',
			icon: <FileText size={18} />,
		},
	];

	const pollingStationLinks = [
		{
			to: '/PollingStation',
			label: 'Dashboard',
			icon: <LayoutDashboard size={18} />,
		},
		{
			to: '/PollingStation/register-voter',
			label: 'Register Voter',
			icon: <UserPlus size={18} />, 
		},
		{
			to: '/PollingStation/view-candidates',
			label: 'View Candidates',
			icon: <List size={18} />, 
		},
		{
			to: '/PollingStation/result',
			label: 'View Result',
			icon: <BarChart2 size={18} />, 
		},
	];

	const votersLinks = [
		{
			to: '/voters',
			label: 'Dashboard',
			icon: <LayoutDashboard size={18} />,
		},
		{
			to: '/voters/view-candidates',
			label: 'View Candidates',
			icon: <UserSearch size={18} />, 
		},
		{
			to: '/voters/view-candidates',
			label: 'Vote',
			icon: <Vote size={18} />, 
		},
		{
			to: '/voters/view-voters',
			label: 'View Voters',
			icon: <List size={18} />, 
		},
		{
			to: '/voters/result',
			label: 'View Result',
			icon: <BarChart2 size={18} />, 
		},
	];

	const candidatesLinks = [
		{
			to: '/candidates',
			label: 'Dashboard',
			icon: <LayoutDashboard size={18} />,
		},
		{
			to: '/Candidates/view-candidates',
			label: 'View Candidates',
			icon: <List size={18} />,
		},
		{
			to: '/Candidates/view-voters',
			label: 'View Voters',
			icon: <List size={18} />,
		},
		{
			to: '/Candidates/result',
			label: 'View Result',
			icon: <BarChart2 size={18} />, 
		},
		{
			to: '/Candidates/complain',
			label: 'Complain Submission',
			icon: <AlertCircle size={18} />,
		},
	];

	const linksToRender = pathname.toLowerCase().includes('admin')
		? adminLinks
		: pathname.toLowerCase().includes('constituencymanagers')
		? constituencyLinks
		: pathname.toLowerCase().includes('boardmanagers')
		? boardManagerLinks
		: pathname.toLowerCase().includes('pollingstation')
		? pollingStationLinks
		: pathname.toLowerCase().includes('voters')
		? votersLinks
		: pathname.toLowerCase().includes('candidates')
		? candidatesLinks
		: [];

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:relative z-50 transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'
        } h-full text-white flex flex-col p-4`}
        style={{ backgroundColor: 'rgb(22, 53, 80)' }}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-4 mt-2">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 ${
                sidebarOpen ? 'h-12 w-auto' : 'h-10 w-10'
              }`}
            />
          </div>
          <div className="w-full mt-4">
            <hr className="border-gray-600" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav>
            {linksToRender.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition-all duration-300 ${
                  pathname === to ? '' : ''
                }`}
                onClick={isMobile ? toggleSidebar : undefined}
              >
                <span className="flex-shrink-0">{icon}</span>
                {sidebarOpen && <span className="text-sm truncate">{label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;