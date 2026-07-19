import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { EmptyState } from '../ui/Shared/EmptyState';
import { Clock } from 'lucide-react';

export const ActivityTimeline = ({ activities = [] }) => {
  return (
    <div>
      <SectionHeader 
        title="Recent Activity" 
        subtitle="Track your latest interactions."
      />
      
      {activities.length === 0 ? (
        <EmptyState 
          icon={Clock}
          title="No Recent Activity"
          description="Your activity timeline will populate as you use the platform."
        />
      ) : (
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8">
          <div className="space-y-6 border-l-2 border-muted ml-3">
            {/* Timeline items will go here */}
          </div>
        </div>
      )}
    </div>
  );
};
