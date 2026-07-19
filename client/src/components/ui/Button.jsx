import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const buttonVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
  success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm",
};

const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 py-2",
  lg: "h-12 px-8 text-lg",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}, ref) => {
  const Comp = "button";
  
  return (
    <Comp
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Comp>
  );
});

Button.displayName = "Button";

export const IconButton = React.forwardRef(({
  className,
  variant = 'ghost',
  icon,
  isLoading,
  ...props
}, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      size="icon"
      className={cn("rounded-full", className)}
      isLoading={isLoading}
      {...props}
    >
      {icon}
    </Button>
  );
});

IconButton.displayName = "IconButton";

export const ButtonGroup = ({ children, className, ...props }) => {
  return (
    <div className={cn("inline-flex -space-x-px rounded-md shadow-sm", className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        
        return React.cloneElement(child, {
          className: cn(
            child.props.className,
            "rounded-none",
            isFirst && "rounded-l-md",
            isLast && "rounded-r-md",
            "focus:z-10" // Ensure focus ring appears above adjacent buttons
          )
        });
      })}
    </div>
  );
};
