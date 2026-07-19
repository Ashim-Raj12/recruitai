import React from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { useProfileStore } from '../../store/profileStore';
import { Loader2, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const ProfessionalInfoForm = ({ profile }) => {
  const { updateProfile, isLoading } = useProfileStore();
  
  const { register, handleSubmit } = useRHForm({
    defaultValues: {
      headline: profile?.professionalInfo?.headline || '',
      currentRole: profile?.professionalInfo?.currentRole || '',
      yearsOfExperience: profile?.professionalInfo?.yearsOfExperience || 0,
      employmentStatus: profile?.professionalInfo?.employmentStatus || '',
      currentCompany: profile?.professionalInfo?.currentCompany || '',
      expectedSalary: profile?.professionalInfo?.expectedSalary || '',
      preferredSalary: profile?.professionalInfo?.preferredSalary || '',
      preferredJobType: profile?.professionalInfo?.preferredJobType || '',
      noticePeriod: profile?.professionalInfo?.noticePeriod || '',
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      professionalInfo: {
        headline: data.headline,
        currentRole: data.currentRole,
        yearsOfExperience: Number(data.yearsOfExperience),
        employmentStatus: data.employmentStatus,
        currentCompany: data.currentCompany,
        expectedSalary: data.expectedSalary,
        preferredSalary: data.preferredSalary,
        preferredJobType: data.preferredJobType,
        noticePeriod: data.noticePeriod,
      }
    };
    
    const res = await updateProfile(payload);
    if (res.success) {
      toast.success('Professional Information updated successfully');
    } else {
      toast.error(res.error || 'Failed to update Professional Information');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Professional Information</h3>
        <p className="text-white/50 text-sm mb-6">Details about your current professional status.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Professional Headline</label>
          <input 
            {...register('headline')} 
            type="text" 
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder="e.g. Senior Full Stack Developer | React & Node.js Expert"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Current Role</label>
            <input 
              {...register('currentRole')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Current Company</label>
            <input 
              {...register('currentCompany')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. Google"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Years of Experience</label>
            <input 
              {...register('yearsOfExperience')} 
              type="number" 
              min="0"
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Employment Status</label>
            <select 
              {...register('employmentStatus')} 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            >
              <option value="">Select Status</option>
              <option value="Employed">Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Freelance">Freelance</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Preferred Job Type</label>
            <select 
              {...register('preferredJobType')} 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            >
              <option value="">Select Type</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Notice Period</label>
            <select 
              {...register('noticePeriod')} 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            >
              <option value="">Select Notice Period</option>
              <option value="Immediate">Immediate</option>
              <option value="15 Days">15 Days</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
              <option value="3 Months+">3 Months+</option>
            </select>
          </div>
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

export default ProfessionalInfoForm;
