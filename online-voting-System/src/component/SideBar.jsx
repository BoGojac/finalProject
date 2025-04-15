// import React from 'react';
import {
	AlertCircle,
	BarChart2,
	CalendarCheck,
	CalendarRange,
	FileText,
	Home,
	// ImageOff,
	List,
	Map,
	PieChart,
	Settings,
	UserPlus,
	Users,
	UserSearch,
	Vote,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
// ImageOff;
import logo from '../assets/NEBELOGO.svg';
import PropTypes from 'prop-types';
//import { ChevronLeft, ChevronRight } from 'lucide-react';




const Sidebar = ({ sidebarOpen }) => {
	const { pathname } = useLocation();

	const adminLinks = [
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
		{ to: '/admin/Setting', label: 'Setting', icon: <Settings size={18} /> },
	];

	const constituencyLinks = [
		{
			to: '/constituency/register-candidate',
			label: 'Register Candidate',
			icon: <UserPlus size={18} />,
		},
		{
			to: '/constituency/view-candidates',
			label: 'View Candidates',
			icon: <List size={18} />,
		},
		{
			to: '/constituency/view-voters',
			label: 'View Voters',
			icon: <List size={18} />,
		},
		{
			to: '/constituency/result',
			label: 'View Result',
			icon: <BarChart2 size={18} />,
		},
		{
			to: '/constituency/setting',
			label: 'Setting',
			icon: <Settings size={18} />,
		},
	];

	const boardManagerLinks = [
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
			icon: <PieChart size={18} />, // Better for analytics
		},
		{
			to: '/admin/override-history',
			label: 'Override History',
			icon: <FileText size={18} />,
		},
		{
			to: '/admin/view-override-history',
			label: 'View Override History',
			icon: <FileText size={18} />,
		},
		{
			to: '/boardmanagers/setting',
			label: 'Setting',
			icon: <Settings size={18} />, // Perfect as-is
		},
	];

	const pollingStationLinks = [
		{
			to: '/pollingstation/register-voter',
			label: 'Register Voter',
			icon: <UserPlus size={18} />, // Add user action
		},
		{
			to: '/pollingstation/view-voters',
			label: 'View Voters',
			icon: <List size={18} />, // List representation
		},
		{
			to: '/pollingstation/view-candidates',
			label: 'View Candidates',
			icon: <List size={18} />, // Searching/inspecting
		},
		{
			to: '/pollingstation/result',
			label: 'View Result',
			icon: <BarChart2 size={18} />, // Data visualization
		},
		{
			to: '/pollingstation/setting',
			label: 'Setting',
			icon: <Settings size={18} />,
		},
	];

	const votersLinks = [
		{
			to: '/voters/view-candidates',
			label: 'View Candidates',
			icon: <UserSearch size={18} />, // Explore candidates
		},
		{
			to: '/voters/view-candidates',
			label: 'Vote',
			icon: <Vote size={18}/>, // Explore candidates
		},
		{
			to: '/voters/view-voters',
			label: 'View Voters',
			icon: <List size={18} />, // Simple list view
		},
		{
			to: '/voters/result',
			label: 'View Result',
			icon: <PieChart size={18} />, // Results visualization
		},
		{
			to: '/voters/setting',
			label: 'Setting',
			icon: <Settings size={18} />,
		},
	];

	const candidatesLinks = [
		{
			to: '/candidates/view-voters',
			label: 'View Voters',
			icon: <List size={18} />,
		},
		{
			to: '/candidates/view-candidates',
			label: 'View Candidates',
			icon: <List size={18} />,
		},
		{
			to: '/candidates/complain',
			label: 'Complain Submission',
			icon: <AlertCircle size={18} />, // Indicates an issue
		},
		{
			to: '/candidates/setting', // Fixed typo in "candiadtes"
			label: 'Setting',
			icon: <Settings size={18} />,
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
		
			<aside
			  className={`transition-all duration-300 ${
				sidebarOpen ? 'w-60' : 'w-16'
			  } h-screen text-white flex flex-col p-4 overflow-y-auto`}
			  style={{ backgroundColor: 'rgb(22, 53, 80)' }}
			>
			  {/* Logo Section */}
			  <div className="flex flex-col items-center mb-4 mt-2">
				<div className="flex items-center">
				  <img src={logo} alt="Logo" className={`transition-all duration-300 ${sidebarOpen ? 'h-15 w-30' : 'h-10 w-10'}`} />
				</div>
				<div className="w-full mt-4">
				  <hr className="border-gray-600" />
				</div>
			  </div>
		
			  {/* Navigation */}
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
					  {sidebarOpen && <span className="text-sm">{label}</span>}
					</Link>
				  ))}
				</nav>
			  </div>
			</aside>
	);
};






Sidebar.propTypes = {
  	sidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
