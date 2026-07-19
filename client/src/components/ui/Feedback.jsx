import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

const alertVariants = {
  default: "bg-background text-foreground",
  destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
  warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
};

export const Alert = React.forwardRef(({ className, variant = "default", title, children, icon: Icon, ...props }, ref) => {
  let DefaultIcon = Info;
  if (variant === 'destructive') DefaultIcon = XCircle;
  if (variant === 'success') DefaultIcon = CheckCircle2;
  if (variant === 'warning') DefaultIcon = AlertCircle;
  
  const RenderIcon = Icon || DefaultIcon;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        alertVariants[variant],
        className
      )}
      {...props}
    >
      <RenderIcon className="h-4 w-4" />
      {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
      <div className="text-sm [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  );
});
Alert.displayName = "Alert";

export const Banner = ({ children, variant = 'default', className, ...props }) => {
  const bgColors = {
    default: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    warning: "bg-warning text-warning-foreground",
  };
  
  return (
    <div className={cn("w-full px-4 py-3 text-sm font-medium text-center", bgColors[variant], className)} {...props}>
      {children}
    </div>
  );
};

export const SkeletonLoader = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};

export const LoadingSpinner = ({ className, size = 'md', ...props }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  
  return (
    <div className={cn("animate-spin rounded-full border-2 border-primary border-t-transparent", sizes[size], className)} {...props} />
  );
};

export const ProgressBar = ({ value = 0, max = 100, className, indicatorClassName, ...props }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
      <motion.div
        className={cn("h-full bg-primary transition-all", indicatorClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export const CircularProgress = ({ value = 0, size = 40, strokeWidth = 4, className, color = "currentColor" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className={cn("transform -rotate-90", className)}>
      <circle
        className="text-muted stroke-current"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <motion.circle
        className="stroke-current transition-all duration-500 ease-out"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{ color }}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
      />
    </svg>
  );
};
