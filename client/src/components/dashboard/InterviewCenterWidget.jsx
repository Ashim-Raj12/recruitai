import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { EmptyState } from '../ui/Shared/EmptyState';
import { MessageSquare } from 'lucide-react';

export const InterviewCenterWidget = ({ interviews = [] }) => {
  return (
    <div>
      <SectionHeader 
        title="Interview Center" 
        subtitle="Practice with AI and track upcoming interviews."
        actionLabel="Start Mock Interview"
        actionHref="/mock-interview"
      />
      
      {interviews.length === 0 ? (
        <EmptyState 
          icon={MessageSquare}
          title="No Interviews Scheduled"
          description="Start a mock interview with our AI to prepare for behavioral or technical rounds."
          actionLabel="Start Practice"
          onAction={() => {}}
        />
      ) : (
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8">
          {/* List interviews */}
        </div>
      )}
    </div>
  );
};
