import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard } from '../components/auth/AuthCard';
import { SocialButton } from '../components/auth/SocialButton';
import { PasswordStrength } from '../components/auth/PasswordStrength';
import { Input } from '../components/ui/Forms';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { register: authRegister, isActionLoading, setTempEmail } = useAuthStore();

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });

  const watchPassword = useWatch({ control, name: "password", defaultValue: "" });

  const onSubmit = async (data) => {
    const result = await authRegister({
      fullName: data.fullName,
      email: data.email,
      password: data.password
    });

    if (result.success) {
      setTempEmail(data.email);
      toast.success(result.message || 'Account created! Please verify your email.');
      navigate('/verify-email');
    } else {
      toast.error(result.error || 'Failed to create account.');
    }
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Start your AI-powered career journey"
      backLink={
        <span>
          Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input 
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input 
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <div>
          <Input 
            label="Password"
            type="password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordStrength password={watchPassword} />
        </div>

        <Input 
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className="pt-2">
          <label className="flex items-start gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 rounded border-border bg-background accent-primary shrink-0" 
              {...register('terms')} 
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </span>
          </label>
          {errors.terms && <p className="text-xs text-destructive mt-1">{errors.terms.message}</p>}
        </div>

        <Button type="submit" className="w-full mt-2 h-11" isLoading={isActionLoading}>
          Create Account
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground uppercase">Or continue with</span>
        </div>
      </div>

      <SocialButton provider="Google" onClick={() => toast.success('Google signup clicked')} />
    </AuthCard>
  );
};

export default Register;
