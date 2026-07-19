import React from 'react';
import { EditorSidebar } from '../../components/resume-studio/Editor/EditorSidebar';
import { EditorArea } from '../../components/resume-studio/Editor/EditorArea';
import { PreviewPanel } from '../../components/resume-studio/Preview/PreviewPanel';

export const ResumeStudio = () => {
  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* 1. Left Sidebar Navigation */}
      <EditorSidebar />
      
      {/* 2. Middle Editor Area */}
      <div className="w-[45%] h-full border-r border-border/50 overflow-y-auto bg-background">
        <EditorArea />
      </div>

      {/* 3. Right Preview Panel */}
      <div className="flex-1 h-full bg-muted/20 overflow-hidden relative">
        <PreviewPanel />
      </div>
    </div>
  );
};

export default ResumeStudio;
