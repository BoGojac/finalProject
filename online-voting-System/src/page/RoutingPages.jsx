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
					<Route path="/Admin" element={<AdminPage />} />
					{/* Board Managers Page Route */}
					<Route
						path="/BoardManagers"
						element={<BoardManagersPage />}
					/>
					{/* Candidates Page Route */}
					<Route path="/Candidates" element={<CandidatesPage />} />
					{/* Constituency managers Page Route */}
					<Route
						path="/ConstituencyManagers"
						element={<ConstituencyPage />}
					/>
					{/* Polling Station Page Route */}
					<Route
						path="/PollingStation"
						element={<PollingStationPage />}
					/>
					{/* Voters Page Route */}
					<Route path="/VotersPage" element={<VotersPage />} />
					{/* Login Page Route */}
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Router>
		</div>
	);
};

export default RoutingPages;
