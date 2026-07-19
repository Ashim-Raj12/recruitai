import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, MailCheck } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Forms';
import { Button } from '../components/ui/Button';

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call to send recovery email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <AuthCard
        title="Check your email"
        subtitle={`We've sent a password reset link to ${getValues('email')}`}
      >
        <div className="flex flex-col items-center text-center pb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <MailCheck size={32} className="text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Click the link in the email to reset your password. If you don't see it, check your spam folder.
          </p>
          <Button 
            variant="outline" 
            className="w-full h-11"
            onClick={() => setIsSent(false)}
          >
            Try another email
          </Button>
          <Link to="/login" className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to login
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions."
      backLink={
        <Link to="/login" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input 
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" className="w-full h-11" isLoading={isLoading}>
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;
