import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, MoreVertical, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ResumeDashboard = () => {
  const navigate = useNavigate();
  // Empty state simulation
  const resumes = [];

  return (
    <div className="flex-1 overflow-auto bg-background p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Library</h1>
            <p className="text-muted-foreground">Manage and optimize your resumes for different roles.</p>
          </div>
          <Button onClick={() => navigate('/resume/create')} size="lg" className="shrink-0 rounded-full shadow-lg hover:scale-105 transition-transform">
            <Plus size={18} className="mr-2" /> Create New Resume
          </Button>
        </div>

        {/* Content */}
        {resumes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center p-12 lg:p-24 border border-dashed border-border/60 rounded-3xl bg-card shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <FileText size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">No resumes yet</h3>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              Build your first ATS-friendly resume using our intelligent editor. You can create multiple versions tailored for specific jobs.
            </p>
            <Button onClick={() => navigate('/resume/create')} size="lg">
              Get Started
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Will map resumes here */}
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeDashboard;
