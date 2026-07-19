import React from 'react';
import { useResumeStore } from '../../../../store/resumeStore';
import { Input } from '../../../ui/Forms';
import { motion } from 'framer-motion';

export const PersonalInfo = () => {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const info = resumeData.personalInfo;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Personal Information</h2>
        <p className="text-muted-foreground text-sm">Provide your contact details so employers can reach you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input 
          label="Full Name" 
          value={info.fullName} 
          onChange={(e) => updatePersonalInfo('fullName', e.target.value)} 
          placeholder="e.g. Ashim Raj"
        />
        <Input 
          label="Headline" 
          value={info.headline} 
          onChange={(e) => updatePersonalInfo('headline', e.target.value)} 
          placeholder="e.g. Senior Frontend Engineer"
        />
        <Input 
          label="Email Address" 
          type="email"
          value={info.email} 
          onChange={(e) => updatePersonalInfo('email', e.target.value)} 
          placeholder="ashim@example.com"
        />
        <Input 
          label="Phone Number" 
          value={info.phone} 
          onChange={(e) => updatePersonalInfo('phone', e.target.value)} 
          placeholder="+1 (555) 000-0000"
        />
        <Input 
          label="Location" 
          value={info.location} 
          onChange={(e) => updatePersonalInfo('location', e.target.value)} 
          placeholder="San Francisco, CA"
          className="sm:col-span-2"
        />
      </div>

      <div className="pt-6 border-t border-border/50">
        <h3 className="text-lg font-semibold mb-4">Social Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input 
            label="LinkedIn" 
            value={info.linkedin} 
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} 
            placeholder="linkedin.com/in/username"
          />
          <Input 
            label="GitHub" 
            value={info.github} 
            onChange={(e) => updatePersonalInfo('github', e.target.value)} 
            placeholder="github.com/username"
          />
          <Input 
            label="Portfolio / Website" 
            value={info.portfolio} 
            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)} 
            placeholder="yourdomain.com"
            className="sm:col-span-2"
          />
        </div>
      </div>
    </motion.div>
  );
};
