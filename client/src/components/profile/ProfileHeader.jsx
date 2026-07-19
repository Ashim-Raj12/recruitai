import React from 'react';
import { Camera, Edit2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const ProfileHeader = ({ profile }) => {
  const { user } = useAuthStore(); // Fallback for name since Name is not in Profile schema explicitly (Wait, it should be in User schema)

  return (
    <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-border/50">
      {/* Cover Banner */}
      <div className="h-32 bg-gradient-to-r from-primary/20 via-purple-500/20 to-zinc-900 border-b border-border/50 relative">
        <button className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors border border-white/10">
          <Edit2 size={14} /> Edit Cover
        </button>
      </div>

      <div className="px-6 sm:px-10 pb-8 flex flex-col sm:flex-row gap-6 sm:items-end -mt-12 relative z-10">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-zinc-950 overflow-hidden bg-zinc-800">
            {profile.avatar || user?.avatar ? (
              <img 
                src={profile.avatar || user?.avatar} 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/20 bg-zinc-800">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          
          <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity cursor-pointer">
            <Camera size={24} className="text-white" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 pb-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{user?.fullName || 'User'}</h2>
          <p className="text-white/60 text-base sm:text-lg mt-1">
            {profile?.professionalInfo?.headline || 'Add a professional headline'}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-white/50 font-medium">
            {profile?.professionalInfo?.currentRole && (
              <span>{profile.professionalInfo.currentRole}</span>
            )}
            {profile?.personalInfo?.city && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{profile.personalInfo.city}</span>
              </>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="pb-2">
          <button className="bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
