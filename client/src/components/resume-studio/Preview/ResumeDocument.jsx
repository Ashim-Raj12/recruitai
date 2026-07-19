import React from 'react';

// Basic Modern Template for A4 Preview
export const ResumeDocument = ({ data, template }) => {
  const { personalInfo, summary, experience, education, projects, skills, certifications } = data;

  return (
    <div className="w-full h-full bg-white text-black p-10 font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="border-b-2 border-black/10 pb-6 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-black mb-1">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-xl text-gray-600 font-medium mb-3">
          {personalInfo.headline || 'Professional Headline'}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
          {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {summary && summary !== '<p></p>' && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-black/10 pb-1">Professional Summary</h2>
          <div 
            className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none prose-p:my-1" 
            dangerouslySetInnerHTML={{ __html: summary }} 
          />
        </section>
      )}

      <div className="flex gap-8">
        
        {/* LEFT COLUMN: Experience & Projects */}
        <div className="flex-1 space-y-6">
          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-black/10 pb-1">Experience</h2>
              <div className="space-y-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-black">{exp.position || 'Position Title'}</h3>
                      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                        {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2 text-sm text-gray-600">
                      <span className="font-medium">{exp.company || 'Company Name'}</span>
                      <span className="text-xs">{exp.location}</span>
                    </div>
                    {exp.description && (
                      <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-black/10 pb-1">Projects</h2>
              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-black flex items-center gap-2">
                        {proj.name || 'Project Name'}
                        {proj.url && <span className="text-xs font-normal text-blue-600">{proj.url}</span>}
                      </h3>
                    </div>
                    {proj.techStack && <p className="text-xs font-medium text-gray-600 mb-2">Tech: {proj.techStack}</p>}
                    {proj.description && (
                      <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {proj.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Education, Skills, Certs */}
        <div className="w-[30%] space-y-6">
          
          {/* EDUCATION */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-black/10 pb-1">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm text-black leading-tight mb-1">{edu.institution || 'University Name'}</h3>
                    <p className="text-xs text-gray-700 mb-1">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider">
                      <span>{edu.startDate} - {edu.endDate}</span>
                      {edu.cgpa && <span>GPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-black/10 pb-1">Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(skill => (
                  <span key={skill.id} className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-3 border-b border-black/10 pb-1">Certifications</h2>
              <div className="space-y-3">
                {certifications.map(cert => (
                  <div key={cert.id}>
                    <h3 className="font-bold text-xs text-black leading-tight mb-0.5">{cert.name || 'Certificate'}</h3>
                    <p className="text-[11px] text-gray-600">{cert.issuer}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};
