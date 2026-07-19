import React from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import { User, AlignLeft, Briefcase, GraduationCap, FolderDot, Wrench, Award } from 'lucide-react';

const SECTIONS = [
  { id: 'personalInfo', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: AlignLeft },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: FolderDot },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'certifications', label: 'Certifications', icon: Award },
];

export const EditorSidebar = () => {
  const { ui, setActiveSection } = useResumeStore();

  return (
    <div className="w-16 sm:w-64 h-full border-r border-border/50 bg-card flex flex-col pt-4 shrink-0 overflow-y-auto">
      <div className="px-4 pb-4 hidden sm:block">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Sections</h3>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const isActive = ui.activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span className="text-sm hidden sm:block">{s.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  );
};
