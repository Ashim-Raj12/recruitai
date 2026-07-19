import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Force onboarding if user hasn't completed it, unless they are already in the onboarding flow
  if (user && user.isOnboarded === false && !location.pathname.startsWith('/onboarding')) {
    return <Navigate to="/onboarding/profile" replace />;
  }

  // If user HAS completed onboarding and tries to access onboarding again, redirect to dashboard
  if (user && user.isOnboarded === true && location.pathname.startsWith('/onboarding')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
