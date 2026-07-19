import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { EmptyState } from '../ui/Shared/EmptyState';
import { FileText } from 'lucide-react';

export const ResumeCenterWidget = ({ resumes = [] }) => {
  return (
    <div>
      <SectionHeader 
        title="Resume Center" 
        subtitle="Manage and optimize your resumes for ATS."
        actionLabel="Go to Resumes"
        actionHref="/resume"
      />
      
      {resumes.length === 0 ? (
        <EmptyState 
          icon={FileText}
          title="No Resumes Uploaded"
          description="Upload your current resume to get an instant AI analysis and ATS score."
          actionLabel="Upload Resume"
          onAction={() => {}}
        />
      ) : (
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8">
          {/* Will render resumes list here later */}
        </div>
      )}
    </div>
  );
};
