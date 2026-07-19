import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If user is authenticated, prevent them from accessing guest-only routes like login/register
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
