import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProfileStore } from '../store/profileStore';
import { Loader2 } from 'lucide-react';

import ProfileHeader from '../components/profile/ProfileHeader';
import CompletionProgress from '../components/profile/CompletionProgress';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import ProfessionalInfoForm from '../components/profile/ProfessionalInfoForm';
import CareerGoalsForm from '../components/profile/CareerGoalsForm';
import SkillManager from '../components/profile/SkillManager';

const Profile = () => {
  const { profile, fetchProfile, isLoading } = useProfileStore();
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] text-white/50">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      {/* Profile Header */}
      <ProfileHeader profile={profile} />

      {/* Completion Progress */}
      <CompletionProgress percentage={profile.completionPercentage || 0} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          {['personal', 'professional', 'career', 'skills', 'education', 'experience', 'projects', 'social', 'preferences', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 capitalize font-medium ${
                activeTab === tab
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>

        {/* Form Content Area */}
        <div className="md:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-950 border border-border/50 rounded-2xl p-6 md:p-8"
          >
            {activeTab === 'personal' && <PersonalInfoForm profile={profile} />}
            {activeTab === 'professional' && <ProfessionalInfoForm profile={profile} />}
            {activeTab === 'career' && <CareerGoalsForm profile={profile} />}
            {activeTab === 'skills' && <SkillManager profile={profile} />}
            {activeTab === 'education' && <div className="text-white/50 p-8 text-center">Education Coming Soon</div>}
            {activeTab === 'experience' && <div className="text-white/50 p-8 text-center">Experience Coming Soon</div>}
            {activeTab === 'projects' && <div className="text-white/50 p-8 text-center">Projects Coming Soon</div>}
            {activeTab === 'social' && <div className="text-white/50 p-8 text-center">Social Links Coming Soon</div>}
            {activeTab === 'preferences' && <div className="text-white/50 p-8 text-center">Preferences Coming Soon</div>}
            {activeTab === 'security' && <div className="text-white/50 p-8 text-center">Security Coming Soon</div>}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
