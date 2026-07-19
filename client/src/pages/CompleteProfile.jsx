import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { AvatarUpload } from '../components/onboarding/AvatarUpload';
import { Input, Textarea } from '../components/ui/Forms';
import { Button } from '../components/ui/Button';

const profileSchema = z.object({
  headline: z.string().min(5, 'Headline should be descriptive'),
  location: z.string().min(2, 'Location is required'),
  phone: z.string().optional(),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  
  // Education
  college: z.string().min(2, 'College is required'),
  degree: z.string().min(2, 'Degree is required'),
  graduationYear: z.string().min(4, 'Year is required'),
  
  // Experience
  currentStatus: z.enum(['student', 'fresher', 'working']),
  preferredJobType: z.enum(['remote', 'hybrid', 'onsite']),
});

const CompleteProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      currentStatus: 'student',
      preferredJobType: 'remote'
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call to save profile
      // formData.append('avatar', avatar)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Profile saved successfully!');
      // Navigate to the next step, which is the AI Career Onboarding Wizard
      navigate('/onboarding/setup');
    } catch (error) {
      toast.error('Failed to save profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/60 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10"
        >
          <div className="mb-8 border-b border-border/50 pb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Complete your profile</h1>
            <p className="text-muted-foreground">Tell us a bit about yourself so we can personalize your AI copilot experience.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Section: Basic Info */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium text-primary">Basic Information</h2>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <AvatarUpload value={avatar} onChange={setAvatar} />
                
                <div className="flex-1 space-y-4 w-full">
                  <Input 
                    label="Professional Headline" 
                    placeholder="e.g. Computer Science Student at Stanford" 
                    error={errors.headline?.message}
                    {...register('headline')}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      label="Location" 
                      placeholder="San Francisco, CA" 
                      error={errors.location?.message}
                      {...register('location')}
                    />
                    <Input 
                      label="Phone (Optional)" 
                      type="tel"
                      placeholder="+1 (555) 000-0000" 
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Links */}
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-primary border-t border-border/50 pt-8">Social Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input label="LinkedIn" placeholder="https://linkedin.com/in/..." error={errors.linkedinUrl?.message} {...register('linkedinUrl')} />
                <Input label="GitHub" placeholder="https://github.com/..." error={errors.githubUrl?.message} {...register('githubUrl')} />
                <Input label="Portfolio" placeholder="https://yourwebsite.com" error={errors.portfolioUrl?.message} {...register('portfolioUrl')} />
              </div>
            </section>

            {/* Section: Education */}
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-primary border-t border-border/50 pt-8">Education</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input label="College / University" placeholder="MIT" error={errors.college?.message} {...register('college')} />
                <Input label="Degree" placeholder="B.S. Computer Science" error={errors.degree?.message} {...register('degree')} />
                <Input label="Graduation Year" placeholder="2025" error={errors.graduationYear?.message} {...register('graduationYear')} />
              </div>
            </section>

            {/* Section: Experience & Preferences */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium text-primary border-t border-border/50 pt-8">Experience & Preferences</h2>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">Current Status</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['student', 'fresher', 'working'].map((status) => (
                    <label key={status} className={`p-4 rounded-xl border cursor-pointer transition-all text-center capitalize ${watch('currentStatus') === status ? 'bg-primary/10 border-primary text-primary' : 'bg-card border-border hover:border-primary/50'}`}>
                      <input type="radio" value={status} className="hidden" {...register('currentStatus')} />
                      {status}
                    </label>
                  ))}
                </div>
                {errors.currentStatus && <p className="text-xs text-destructive">{errors.currentStatus.message}</p>}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Preferred Job Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['remote', 'hybrid', 'onsite'].map((type) => (
                    <label key={type} className={`p-4 rounded-xl border cursor-pointer transition-all text-center capitalize ${watch('preferredJobType') === type ? 'bg-primary/10 border-primary text-primary' : 'bg-card border-border hover:border-primary/50'}`}>
                      <input type="radio" value={type} className="hidden" {...register('preferredJobType')} />
                      {type}
                    </label>
                  ))}
                </div>
                {errors.preferredJobType && <p className="text-xs text-destructive">{errors.preferredJobType.message}</p>}
              </div>
            </section>

            <div className="pt-8 border-t border-border/50 flex justify-end">
              <Button type="submit" size="lg" className="px-8" isLoading={isLoading}>
                Save & Continue
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CompleteProfile;
