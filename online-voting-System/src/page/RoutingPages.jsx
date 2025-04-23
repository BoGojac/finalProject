import Layout from '../component/Layout';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import BoardManagersPage from './BoardManagersPage';
import CandidatesPage from './CandidatesPage';
import ConstituencyPage from './ConstituencyPage';
import HomePage from './HomePage'; // Your HomePage component
import LoginPage from './LoginPage'; // Your LoginPage component
import PollingStationPage from './PollingStationPage';
import VotersPage from './VotersPage';
import UsersList from "../component/UsersList";
import OverrideHistory from '../component/OverrideHistory';
import AdminPageCards from '../component/ui/AdminPageCards';

const RoutingPages = () => {
	return (
		<div>
			<Router>
			
				<Routes>
				    
					{/* Home Page Route */}
					<Route path="/" element={<HomePage />} />
					{/* Admin Page Route */}
					<Route path="/Admin" element={<Layout><AdminPage /></Layout>}>
						<Route index element={<AdminPageCards />} />
						<Route path="manage-user" element={<UsersList />} />
						<Route path="view-override-history" element={<OverrideHistory />} />
					</Route> 
					{/* Board Managers Page Route */}
					<Route
						path="/BoardManagers"
						element={<Layout><BoardManagersPage /></Layout>}
					/>
					{/* Candidates Page Route */}
					<Route path="/Candidates" element={<Layout><CandidatesPage /></Layout>} />
					{/* Constituency managers Page Route */}
					<Route
						path="/ConstituencyManagers"
						element={<Layout><ConstituencyPage /></Layout>}
					/>
					{/* Polling Station Page Route */}
					<Route
						path="/PollingStation"
						element={<Layout><PollingStationPage /></Layout>}
					/>
					{/* Voters Page Route */}
					<Route path="/VotersPage" element={<Layout><VotersPage /></Layout>} />
					{/* Login Page Route */}
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Router>
		</div>
	);
};

export default RoutingPages;
