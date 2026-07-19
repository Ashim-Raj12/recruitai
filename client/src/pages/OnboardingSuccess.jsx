import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const OnboardingSuccess = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();

  const handleFinish = async () => {
    // Set user as fully onboarded in the backend
    if (user) {
      await updateProfile({ isOnboarded: true });
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      
      {/* Premium background effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-[600px] h-[600px] bg-primary rounded-full blur-[100px] pointer-events-none" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        className="z-10 flex flex-col items-center text-center max-w-md"
      >
        <div className="w-20 h-20 bg-card border border-border shadow-2xl rounded-2xl flex items-center justify-center mb-8 relative">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
          >
            <Sparkles size={40} className="text-primary" />
          </motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-background"
          />
        </div>

        <h1 className="text-4xl font-bold font-heading mb-4 tracking-tight">You're all set!</h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Your AI career copilot has been initialized with your goals and experience. Let's start preparing for your dream job.
        </p>

        <Button 
          size="lg" 
          className="w-full text-base h-14 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          onClick={handleFinish}
        >
          Enter Dashboard <ArrowRight className="ml-2" size={18} />
        </Button>
      </motion.div>
    </div>
  );
};

export default OnboardingSuccess;
