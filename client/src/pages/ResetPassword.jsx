import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthCard } from '../components/auth/AuthCard';
import { PasswordStrength } from '../components/auth/PasswordStrength';
import { Input } from '../components/ui/Forms';
import { Button } from '../components/ui/Button';

const resetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' }
  });

  const watchPassword = useWatch({ control, name: "password", defaultValue: "" });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call using the token from URL
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      toast.error('Failed to reset password. Link may be expired.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthCard title="Password reset">
        <div className="flex flex-col items-center text-center pb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} className="text-success" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Your password has been successfully reset. Click below to log in magically.
          </p>
          <Button 
            className="w-full h-11"
            onClick={() => navigate('/login')}
          >
            Continue to Login
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Set new password"
      subtitle="Your new password must be different from previous used passwords."
      backLink={
        <Link to="/login" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input 
            label="New Password"
            type="password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordStrength password={watchPassword} />
        </div>

        <Input 
          label="Confirm New Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        
        <Button type="submit" className="w-full mt-2 h-11" isLoading={isLoading}>
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
};

export default ResetPassword;
