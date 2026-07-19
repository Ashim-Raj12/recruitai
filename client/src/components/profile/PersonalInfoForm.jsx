import React from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { useProfileStore } from '../../store/profileStore';
import { Loader2, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const PersonalInfoForm = ({ profile }) => {
  const { updateProfile, isLoading } = useProfileStore();
  
  const { register, handleSubmit, formState: { errors } } = useRHForm({
    defaultValues: {
      phone: profile?.personalInfo?.phone || '',
      dateOfBirth: profile?.personalInfo?.dateOfBirth ? new Date(profile.personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
      gender: profile?.personalInfo?.gender || '',
      country: profile?.personalInfo?.country || '',
      state: profile?.personalInfo?.state || '',
      city: profile?.personalInfo?.city || '',
      timezone: profile?.personalInfo?.timezone || '',
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      personalInfo: {
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth : null,
        gender: data.gender,
        country: data.country,
        state: data.state,
        city: data.city,
        timezone: data.timezone,
      }
    };
    
    const res = await updateProfile(payload);
    if (res.success) {
      toast.success('Personal Information updated successfully');
    } else {
      toast.error(res.error || 'Failed to update Personal Information');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Personal Information</h3>
        <p className="text-white/50 text-sm mb-6">Manage your basic personal details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Phone Number</label>
          <input 
            {...register('phone')} 
            type="tel" 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Date of Birth</label>
          <input 
            {...register('dateOfBirth')} 
            type="date" 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all [color-scheme:dark]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Gender</label>
          <select 
            {...register('gender')} 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Timezone</label>
          <input 
            {...register('timezone')} 
            type="text" 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="e.g. UTC-5"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Country</label>
          <input 
            {...register('country')} 
            type="text" 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="Country"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">State / Province</label>
          <input 
            {...register('state')} 
            type="text" 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="State"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70">City</label>
          <input 
            {...register('city')} 
            type="text" 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="City"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button 
          type="submit" 
          disabled={isLoading} 
          className="flex items-center gap-2"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
