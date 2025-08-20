import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role?.toLowerCase().replace(/\s+/g, '');

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // or your 403 page
  }

  return <Outlet />;
};

// ✅ PropTypes validation
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
