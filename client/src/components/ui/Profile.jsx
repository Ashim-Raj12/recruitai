import React from 'react';
import { cn } from '../../utils/cn';

export const Avatar = React.forwardRef(({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-lg",
  };

  return (
    <div
      ref={ref}
      className={cn("relative flex shrink-0 overflow-hidden rounded-full bg-muted", sizes[size], className)}
      {...props}
    >
      {src ? (
        <img className="aspect-square h-full w-full object-cover" src={src} alt={alt || "Avatar"} />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium">
          {fallback || "?"}
        </div>
      )}
    </div>
  );
});
Avatar.displayName = "Avatar";

export const AvatarGroup = ({ children, className, max = 4 }) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const excess = avatars.length - max;

  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative ring-2 ring-background rounded-full">
          {avatar}
        </div>
      ))}
      {excess > 0 && (
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted ring-2 ring-background text-sm font-medium text-muted-foreground">
          +{excess}
        </div>
      )}
    </div>
  );
};

export const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
    success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
    warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

// Specialized Badges
export const SkillBadge = ({ skill, className }) => (
  <Badge variant="secondary" className={cn("px-3 py-1", className)}>{skill}</Badge>
);

export const StatusBadge = ({ status, className }) => {
  let variant = "default";
  if (status.toLowerCase() === 'active' || status.toLowerCase() === 'completed') variant = "success";
  if (status.toLowerCase() === 'pending' || status.toLowerCase() === 'in progress') variant = "warning";
  if (status.toLowerCase() === 'rejected' || status.toLowerCase() === 'failed') variant = "destructive";

  return <Badge variant={variant} className={className}>{status}</Badge>;
};
