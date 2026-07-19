import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthCard } from '../components/auth/AuthCard';
import { SocialButton } from '../components/auth/SocialButton';
import { Input, Checkbox } from '../components/ui/Forms';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, isActionLoading } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data) => {
    const result = await login({ email: data.email, password: data.password });
    
    if (result.success) {
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Failed to login');
    }
  };

  const handleGoogleLogin = () => {
    toast.success('Google login clicked (UI Only)');
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
      backLink={
        <span>
          Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="flex justify-between items-center mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border bg-background accent-primary" {...register('rememberMe')} />
              <span className="text-xs text-muted-foreground">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full mt-6 h-11" isLoading={isActionLoading}>
          Sign In
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

      <SocialButton provider="Google" onClick={handleGoogleLogin} />
    </AuthCard>
  );
};

export default Login;
