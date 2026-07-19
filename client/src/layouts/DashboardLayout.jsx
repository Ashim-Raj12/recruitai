import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, User, Settings, FileText, Upload, BrainCircuit, Code, MessageSquare, History, Briefcase } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Upload Resume', href: '/resume/upload', icon: Upload },
  { name: 'Analyzer', href: '/resume/analyzer', icon: BrainCircuit },
  { name: 'Mock Interview', href: '/mock-interview', icon: MessageSquare },
  { name: 'Coding Interview', href: '/coding-interview', icon: Code },
  { name: 'Career Coach', href: '/career-coach', icon: User },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'History', href: '/history', icon: History },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const DashboardLayout = () => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  const { logout } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-card text-card-foreground transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-lg">RecruitAI</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="text-sm font-medium hover:underline">
              Toggle Theme
            </button>
            <button onClick={logout} className="text-sm font-medium text-destructive hover:underline">
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
