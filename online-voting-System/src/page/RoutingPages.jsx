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

const RoutingPages = () => {
	return (
		<div>
			<Router>
			
				<Routes>
				   
					{/* Home Page Route */}
					<Route path="/" element={<HomePage />} />
					{/* Admin Page Route */}
					<Route path="/Admin" element={<Layout><AdminPage /></Layout>} />
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
