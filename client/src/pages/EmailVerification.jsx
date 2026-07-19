import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { OTPInput } from '../components/auth/OTPInput';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  
  const navigate = useNavigate();
  const { tempEmail, verifyEmail } = useAuthStore();

  useEffect(() => {
    // If user somehow gets here without registering/having a temp email, redirect
    if (!tempEmail) {
      navigate('/register');
    }
  }, [tempEmail, navigate]);

  useEffect(() => {
    if (countdown > 0 && !isSuccess) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isSuccess]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error('Please enter all 6 digits.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyEmail(tempEmail, otp);
      
      if (result.success) {
        setIsSuccess(true);
        // Redirect after showing success state
        setTimeout(() => {
          navigate('/onboarding/profile');
        }, 2000);
      } else {
        toast.error(result.error || 'Invalid verification code.');
      }
    } catch (error) {
      toast.error('Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      // Import api at the top if needed, but wait, api is in services/api. We should probably add resendVerification to authStore instead. Let's do that for consistency, but for now we can just use the authStore if I update it. Oh, let's just use api here. I will import it.
      await api.post('/auth/resend-verification', { email: tempEmail });
      
      toast.success('Verification code resent!');
      setCountdown(30);
    } catch (error) {
      toast.error('Failed to resend code.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthCard title="Email Verified">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="flex flex-col items-center text-center pb-6"
        >
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} className="text-success" />
          </div>
          <p className="text-sm text-muted-foreground">
            Your email has been successfully verified. Redirecting you to onboarding...
          </p>
        </motion.div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Check your email"
      subtitle={`We sent a verification code to ${tempEmail}`}
    >
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail size={24} className="text-primary" />
        </div>
      </div>
      
      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center">
          <OTPInput length={6} value={otp} onChange={setOtp} />
        </div>
        
        <Button type="submit" className="w-full h-11" isLoading={isLoading}>
          Verify Email
        </Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <p className="text-muted-foreground mb-2">Didn't receive the email?</p>
        <button 
          onClick={handleResend}
          disabled={countdown > 0 || isLoading}
          className="text-primary font-medium hover:underline disabled:text-muted-foreground disabled:hover:no-underline disabled:cursor-not-allowed transition-colors"
        >
          {countdown > 0 ? `Resend code in ${countdown}s` : 'Click to resend'}
        </button>
      </div>
    </AuthCard>
  );
};

export default EmailVerification;
