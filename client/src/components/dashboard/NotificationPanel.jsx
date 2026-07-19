import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { EmptyState } from '../ui/Shared/EmptyState';
import { Bell } from 'lucide-react';

export const NotificationPanel = ({ notifications = [] }) => {
  return (
    <div>
      <SectionHeader 
        title="Notifications" 
      />
      
      {notifications.length === 0 ? (
        <EmptyState 
          icon={Bell}
          title="All Caught Up"
          description="You don't have any new notifications."
        />
      ) : (
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8">
          <div className="space-y-4">
            {/* Notifications list */}
          </div>
        </div>
      )}
    </div>
  );
};
