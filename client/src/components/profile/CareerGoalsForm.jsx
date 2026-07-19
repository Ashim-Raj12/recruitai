import React from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { useProfileStore } from '../../store/profileStore';
import { Loader2, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

const CareerGoalsForm = ({ profile }) => {
  const { updateProfile, isLoading } = useProfileStore();
  
  const { register, handleSubmit } = useRHForm({
    defaultValues: {
      careerGoal: profile?.careerGoals?.careerGoal || '',
      targetRole: profile?.careerGoals?.targetRole || '',
      targetCompanies: profile?.careerGoals?.targetCompanies?.join(', ') || '',
      preferredIndustry: profile?.careerGoals?.preferredIndustry || '',
      dreamCompany: profile?.careerGoals?.dreamCompany || '',
      targetCountry: profile?.careerGoals?.targetCountry || '',
      targetLocation: profile?.careerGoals?.targetLocation || '',
      availableForWork: profile?.careerGoals?.availableForWork ?? true,
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      careerGoals: {
        careerGoal: data.careerGoal,
        targetRole: data.targetRole,
        targetCompanies: data.targetCompanies.split(',').map(c => c.trim()).filter(c => c),
        preferredIndustry: data.preferredIndustry,
        dreamCompany: data.dreamCompany,
        targetCountry: data.targetCountry,
        targetLocation: data.targetLocation,
        availableForWork: data.availableForWork,
      }
    };
    
    const res = await updateProfile(payload);
    if (res.success) {
      toast.success('Career Goals updated successfully');
    } else {
      toast.error(res.error || 'Failed to update Career Goals');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Career Goals</h3>
        <p className="text-white/50 text-sm mb-6">What are you looking for in your next role?</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Career Goal summary</label>
          <textarea 
            {...register('careerGoal')} 
            rows="3"
            className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
            placeholder="Describe your primary career objective..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Target Role</label>
            <input 
              {...register('targetRole')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. Lead Engineer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Dream Company</label>
            <input 
              {...register('dreamCompany')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. OpenAI"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-white/70">Target Companies (comma separated)</label>
            <input 
              {...register('targetCompanies')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. Google, Meta, Stripe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Preferred Industry</label>
            <input 
              {...register('preferredIndustry')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. FinTech, AI, HealthTech"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Target Country</label>
            <input 
              {...register('targetCountry')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. United States"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Target Location</label>
            <input 
              {...register('targetLocation')} 
              type="text" 
              className="w-full bg-zinc-900/50 border border-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              {...register('availableForWork')} 
              type="checkbox" 
              className="w-5 h-5 rounded border-white/20 bg-zinc-900/50 text-primary focus:ring-primary/50 focus:ring-offset-zinc-950"
            />
            <span className="text-white text-sm">I am actively looking for work and available for opportunities.</span>
          </label>
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

export default CareerGoalsForm;
