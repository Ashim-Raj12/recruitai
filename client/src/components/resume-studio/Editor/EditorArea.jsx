import React from 'react';
import { useResumeStore } from '../../../store/resumeStore';

// We will import all section editors here
import { PersonalInfo } from './Sections/PersonalInfo';
import { Summary } from './Sections/Summary';
import { Experience } from './Sections/Experience';
import { Education } from './Sections/Education';
import { Projects } from './Sections/Projects';
import { Skills } from './Sections/Skills';
import { Certifications } from './Sections/Certifications';

export const EditorArea = () => {
  const { ui } = useResumeStore();

  const renderActiveSection = () => {
    switch (ui.activeSection) {
      case 'personalInfo': return <PersonalInfo />;
      case 'summary': return <Summary />;
      case 'experience': return <Experience />;
      case 'education': return <Education />;
      case 'projects': return <Projects />;
      case 'skills': return <Skills />;
      case 'certifications': return <Certifications />;
      default: return <PersonalInfo />;
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto pb-32">
      {renderActiveSection()}
    </div>
  );
};
