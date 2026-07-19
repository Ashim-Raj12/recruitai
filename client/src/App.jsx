import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

function App() {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    // Simulate initial auth check
    const checkAuth = async () => {
      // In a real app, you would verify the token with your backend here
      // For now, we'll just set loading to false after a brief delay
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    checkAuth();
  }, [setLoading]);

  return <RouterProvider router={router} />;
}

export default App;
