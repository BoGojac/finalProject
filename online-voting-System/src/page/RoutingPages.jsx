import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from '../component/Layout';
import ProtectedRoute from '../component/ProtectedRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

// Role Pages
import AdminPage from './AdminPage';
import BoardManagersPage from './BoardManagersPage';
import CandidatesPage from './CandidatesPage';
import ConstituencyPage from './ConstituencyPage';
import PollingStationPage from './PollingStationPage';
import VotersPage from './VotersPage';

// Admin Components
import AdminPageCards from '../component/ui/AdminPageCards';
import UsersList from "../component/UsersList";
import OverrideHistory from "../component/OverrideHistory";
import ServiceUnavailable from '../component/ServiceUnavailable';
import UserProfile from '../component/UserProfile';

// Board Manager Components
import AddRegion from '../component/AddRegion';
import ConstituencyList from '../component/ListOfConsituency';
import PollingStationList from '../component/ListOfPollingStation';
import PartyList from '../component/ListOfParty';
import SetRegistrationTimespan from '../component/SetRegistrationTimespan';
import SetVotingDate from '../component/SetVotingDate';
import OverrideVoting from '../component/OverrideVoting';
import BoardManagerPageCards from '../component/ui/BoardManagersCards';

// Others
import ConstituencyPageCards from '../component/ui/ConstituencyPageCards';
import CandidateList from '../component/ListOfCandidates';
import CandidatesPageCards from '../component/ui/CandidatesPageCards';
import ComplainForm from '../component/CandidateComplainForm';
import PollingStationPageCards from '../component/ui/PollingStationPageCard';
import VoterList from '../component/ListOfVoters';
import VoterPageCards from '../component/ui/VotersPageCards';
import VoteCasting from '../component/VoteCasting';

const RoutingPages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/Admin" element={<Layout><AdminPage /></Layout>}>
            <Route index element={<AdminPageCards />} />
            <Route path="manage-user" element={<UsersList />} />
            <Route path="view-override-history" element={<OverrideHistory />} />
            <Route path="analytics" element={<ServiceUnavailable />} />
            <Route path="database-management" element={<ServiceUnavailable />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Board Manager Routes */}
        <Route element={<ProtectedRoute allowedRoles={['boardmanager']} />}>
          <Route path="/BoardManagers" element={<Layout><BoardManagersPage /></Layout>}>
            <Route index element={<BoardManagerPageCards />} />
            <Route path="add-region" element={<AddRegion />} />
            <Route path="create-constituency" element={<ConstituencyList />} />
            <Route path="create-polling-station" element={<PollingStationList />} />
            <Route path="register-party" element={<PartyList />} />
            <Route path="set-registration-timespan" element={<SetRegistrationTimespan />} />
            <Route path="set-voting-date" element={<SetVotingDate />} />
            <Route path="override-voting" element={<OverrideVoting />} />
			<Route path="view-voters" element={<VoterList />} />
			<Route path="view-candidates" element={<CandidateList />} />			
            <Route path="view-override-history" element={<OverrideHistory />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Candidate Routes */}
        <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
          <Route path="/Candidates" element={<Layout><CandidatesPage /></Layout>}>
            <Route index element={<CandidatesPageCards />} />
            <Route path="complain" element={<ComplainForm />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Constituency Manager Routes */}
        <Route element={<ProtectedRoute allowedRoles={['constituencystaff']} />}>
          <Route path="/ConstituencyManagers" element={<Layout><ConstituencyPage /></Layout>}>
            <Route index element={<ConstituencyPageCards />} />
            <Route path="register-candidate" element={<CandidateList />} />
			<Route path="view-voters" element={<VoterList />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Polling Station Staff Routes */}
        <Route element={<ProtectedRoute allowedRoles={['pollingstationstaff']} />}>
          <Route path="/PollingStation" element={<Layout><PollingStationPage /></Layout>}>
            <Route index element={<PollingStationPageCards />} />
            <Route path="register-voter" element={<VoterList />} />
			<Route path="view-candidate" element={<CandidateList />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Voter Routes */}
        <Route element={<ProtectedRoute allowedRoles={['voter']} />}>
          <Route path="/VotersPage" element={<Layout><VotersPage /></Layout>}>
            <Route index element={<VoterPageCards />} />
            <Route path="vote" element={<VoteCasting />} />
            <Route path="view-candidate" element={<CandidateList />} />
			<Route path="view-voters" element={<VoterList />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutingPages;
