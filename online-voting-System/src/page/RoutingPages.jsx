import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from '../component/Layout';
import OverrideHistory from '../component/OverrideHistory';
import AdminPageCards from '../component/ui/AdminPageCards';
import UsersList from "../component/UsersList";
import AdminPage from './AdminPage';
import BoardManagersPage from './BoardManagersPage';
import CandidatesPage from './CandidatesPage';
import ConstituencyPage from './ConstituencyPage';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage'; 
import PollingStationPage from './PollingStationPage';
import VotersPage from './VotersPage';
import BoardManagerPageCards from '../component/ui/BoardManagersCards';
import ConstituencyList from '../component/ListOfConsituency';
import PollingStationList from '../component/ListOfPollingStation';
import PartyList from '../component/ListOfParty';
import CandidatesPageCards from '../component/ui/CandidatesPageCards';
import ServiceUnavailable from '../component/ServiceUnavailable';
import SetVotingDate from '../component/SetVotingDate';
import SetRegistrationTimespan from '../component/SetRegistrationTimespan';
import OverrideVoting from '../component/OverrideVoting';
import ConstituencyPageCards from '../component/ui/ConstituencyPageCards';
import CandidateList from '../component/ListOfCandidates';
import ComplainForm from '../component/CandidateComplainForm';
import PollingStationPageCards from '../component/ui/PollingStationPageCard';
import VoterList from '../component/ListOfVoters';
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
						<Route path="/Admin/analytics" element= {<ServiceUnavailable/>}/>
						<Route path="/Admin/database-management" element= {<ServiceUnavailable/>}/>
					</Route> 




					{/* Board Managers Page Route */}
					<Route path="/BoardManagers" element={<Layout><BoardManagersPage /></Layout>}>
					<Route index element={<BoardManagerPageCards />} />
					<Route path="create-constituency" element={<ConstituencyList />} />
					<Route path="create-polling-station" element={<PollingStationList />} />
					<Route path="register-party" element={<PartyList />} />
					<Route path="set-registration-timespan" element={<SetRegistrationTimespan />} />
					<Route path="set-voting-date" element={<SetVotingDate />} />
					<Route path="override-voting" element={<OverrideVoting />} />
					<Route path="view-override-history" element={<OverrideHistory />} />
					</Route>



					{/* Candidates Page Route */}
					<Route path="/Candidates" element={<Layout><CandidatesPage /></Layout>} > 
						<Route index element={<CandidatesPageCards />} />
						{/* <Route path="view-candidates" element={<ViewCandidates />} />
						<Route path="view-voters" element={<ViewVoters />} />
						<Route path="result" element={<ViewResult />} /> */}
						<Route path="complain" element={<ComplainForm />} />
					
					</Route>




					{/* Constituency managers Page Route */}
					<Route
						path="/ConstituencyManagers"
						element={<Layout><ConstituencyPage /></Layout>}
					> 
						<Route index element={<ConstituencyPageCards/>}/>
						<Route path="register-candidate" element={<CandidateList/>}/>					
					</Route>



					{/* Polling Station Page Route */}
					<Route
						path="/PollingStation"
						element={<Layout><PollingStationPage /></Layout>}
					> 
						<Route index element={<PollingStationPageCards/>}/>
						<Route path="register-voter" element = {<VoterList/>}/>
						{/* <Route path='view-candidates' element= {}/>
						<Route path='result' element={}/>					 */}
					</Route>


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
