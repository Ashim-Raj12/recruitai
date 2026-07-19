import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, LayoutDashboard, History, Download, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { useThemeStore } from '../store/themeStore';

export const ResumeStudioLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.pathname.includes('/resume/builder');

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Top Navbar specifically for Resume Studio */}
      <header className="flex h-14 items-center justify-between border-b border-border/50 bg-card px-4 lg:px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft size={20} />
          </Button>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <Logo className="scale-90 origin-left hidden sm:flex" />
          <span className="font-semibold text-sm sm:text-base tracking-tight text-muted-foreground ml-2">Resume Studio</span>
        </div>

        {isEditing && (
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-muted/30 rounded-lg p-1 border border-border/50">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background shadow-sm text-sm font-medium">
                <LayoutDashboard size={16} /> Editor
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                <History size={16} /> History
              </button>
            </div>
            
            <div className="h-4 w-px bg-border mx-2 hidden md:block" />
            
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Eye size={16} className="mr-2" /> Preview
            </Button>
            <Button size="sm">
              <Download size={16} className="mr-2" /> Export
            </Button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex relative">
        <Outlet />
      </main>
    </div>
  );
};

export default ResumeStudioLayout;
