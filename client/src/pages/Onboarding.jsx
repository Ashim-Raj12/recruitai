import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useOnboardingStore } from '../store/onboardingStore';
import { ProgressStepper } from '../components/onboarding/ProgressStepper';
import { SingleSelect, MultiSelect, SalarySlider } from '../components/onboarding/SelectionControls';
import { FileUploadArea } from '../components/onboarding/FileUploadArea';
import { Textarea } from '../components/ui/Forms';
import { Button } from '../components/ui/Button';

// Configuration for steps
const TOTAL_STEPS = 8;
const CAREER_GOALS = ['Frontend', 'Backend', 'Full Stack', 'AI Engineer', 'Data Science', 'DevOps', 'UI/UX', 'Cyber Security', 'Cloud', 'Mobile', 'Other'];
const EXPERIENCE_LEVELS = ['Beginner (0-2 YOE)', 'Intermediate (3-5 YOE)', 'Advanced (5+ YOE)'];
const SKILLS = ['React', 'Node.js', 'Python', 'Java', 'Go', 'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'TypeScript', 'GraphQL', 'Next.js', 'System Design'];
const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Netflix', 'Apple', 'Stripe', 'Uber', 'Atlassian', 'Flipkart', 'Startups', 'Other'];

const Onboarding = () => {
  const { 
    currentStep, careerGoal, experienceLevel, skills, targetCompanies, 
    targetSalary, resumeFile, careerGoalsText,
    nextStep, prevStep, updateField 
  } = useOnboardingStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    // Validation before proceeding
    if (currentStep === 1 && !careerGoal) return toast.error('Please select a career goal.');
    if (currentStep === 2 && !experienceLevel) return toast.error('Please select your experience level.');
    if (currentStep === 3 && skills.length === 0) return toast.error('Please select at least one skill.');
    if (currentStep === 4 && targetCompanies.length === 0) return toast.error('Please select at least one company.');
    
    nextStep();
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API Submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/onboarding/success');
    } catch (error) {
      toast.error('Failed to complete onboarding.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">What is your primary career goal?</h2>
            <p className="text-muted-foreground mb-8">This helps us tailor your interview questions and roadmap.</p>
            <SingleSelect options={CAREER_GOALS} selected={careerGoal} onChange={(val) => updateField('careerGoal', val)} />
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">What is your experience level?</h2>
            <p className="text-muted-foreground mb-8">We will adjust the difficulty of mock interviews accordingly.</p>
            <SingleSelect options={EXPERIENCE_LEVELS} selected={experienceLevel} onChange={(val) => updateField('experienceLevel', val)} />
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">What are your core skills?</h2>
            <p className="text-muted-foreground mb-8">Select all technologies you are comfortable working with.</p>
            <MultiSelect options={SKILLS} selected={skills} onChange={(val) => updateField('skills', val)} />
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">Which companies are you targeting?</h2>
            <p className="text-muted-foreground mb-8">Select your dream companies to get targeted interview prep.</p>
            <MultiSelect options={COMPANIES} selected={targetCompanies} onChange={(val) => updateField('targetCompanies', val)} />
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">What is your target salary? (USD)</h2>
            <p className="text-muted-foreground mb-8">We'll help you benchmark your offers and negotiate better.</p>
            <div className="max-w-md mx-auto">
              <SalarySlider value={targetSalary} onChange={(val) => updateField('targetSalary', val)} min={30000} max={300000} step={5000} />
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">Upload your current resume</h2>
            <p className="text-muted-foreground mb-8">Our AI will analyze it and provide immediate optimization feedback later.</p>
            <FileUploadArea 
              file={resumeFile} 
              onFileSelect={(file) => updateField('resumeFile', file)} 
              onFileRemove={() => updateField('resumeFile', null)}
            />
          </motion.div>
        );
      case 7:
        return (
          <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">Any specific career goals? (Optional)</h2>
            <p className="text-muted-foreground mb-8">E.g. "I want to transition from QA to Frontend" or "I want to crack FAANG".</p>
            <Textarea 
              rows={5}
              placeholder="Tell your AI copilot what you want to achieve..."
              value={careerGoalsText}
              onChange={(e) => updateField('careerGoalsText', e.target.value)}
            />
          </motion.div>
        );
      case 8:
        return (
          <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-2xl font-bold mb-2">Review your profile</h2>
            <p className="text-muted-foreground mb-8">Make sure everything looks good before we setup your AI workspace.</p>
            
            <div className="bg-muted/20 border border-border rounded-xl p-6 space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
                <div className="text-muted-foreground">Career Goal</div>
                <div className="col-span-2 font-medium">{careerGoal}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
                <div className="text-muted-foreground">Experience</div>
                <div className="col-span-2 font-medium">{experienceLevel}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
                <div className="text-muted-foreground">Target Salary</div>
                <div className="col-span-2 font-medium">${targetSalary.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-4">
                <div className="text-muted-foreground">Top Skills</div>
                <div className="col-span-2 font-medium">{skills.join(', ')}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-muted-foreground">Resume Attached</div>
                <div className="col-span-2 font-medium text-primary">{resumeFile ? resumeFile.name : 'None'}</div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 bg-background overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="w-full max-w-2xl bg-card border border-border/60 shadow-2xl rounded-2xl overflow-hidden flex flex-col min-h-[600px]">
        
        {/* Header / Stepper */}
        <div className="px-8 pt-10 pb-4">
          <ProgressStepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Content Body */}
        <div className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-border/50 bg-muted/10 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1 || isSubmitting}
            className="w-32"
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button onClick={handleNext} className="w-32">
              Next <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleFinish} isLoading={isSubmitting} className="w-48 bg-primary">
              <Check size={16} className="mr-2" /> Finish Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
