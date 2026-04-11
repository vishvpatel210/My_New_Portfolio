import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRole }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRole && role !== allowedRole) {
    const target = role === 'worker' ? '/worker/dashboard' : '/client/dashboard';
    return <Navigate to={target} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
