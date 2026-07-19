import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { EmptyState } from '../ui/Shared/EmptyState';
import { Briefcase } from 'lucide-react';

export const JobTrackerWidget = ({ jobs = [] }) => {
  return (
    <div>
      <SectionHeader 
        title="Job Tracker" 
        subtitle="Manage your applications across stages."
        actionLabel="View Kanban Board"
        actionHref="/jobs"
      />
      
      {jobs.length === 0 ? (
        <EmptyState 
          icon={Briefcase}
          title="No Jobs Tracked"
          description="Start tracking your job applications. Move them from Wishlist to Offer."
          actionLabel="Add a Job"
          onAction={() => {}}
        />
      ) : (
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 overflow-x-auto">
          {/* Render kanban columns here */}
        </div>
      )}
    </div>
  );
};
