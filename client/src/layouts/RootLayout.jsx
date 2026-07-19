import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '../store/themeStore';
import { useEffect } from 'react';

const RootLayout = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Outlet />
      <Toaster position="bottom-right" />
      <ScrollRestoration />
    </div>
  );
};

export default RootLayout;
