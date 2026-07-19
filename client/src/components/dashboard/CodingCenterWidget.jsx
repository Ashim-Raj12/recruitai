import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { EmptyState } from '../ui/Shared/EmptyState';
import { Code } from 'lucide-react';

export const CodingCenterWidget = ({ challenges = [] }) => {
  return (
    <div>
      <SectionHeader 
        title="Coding Center" 
        subtitle="Sharpen your DSA skills for technical rounds."
        actionLabel="Start Coding"
        actionHref="/coding-interview"
      />
      
      {challenges.length === 0 ? (
        <EmptyState 
          icon={Code}
          title="No Challenges Completed"
          description="You haven't attempted any coding challenges yet. Start with array basics or string manipulation."
          actionLabel="View Challenges"
          onAction={() => {}}
        />
      ) : (
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8">
          {/* List challenges */}
        </div>
      )}
    </div>
  );
};
