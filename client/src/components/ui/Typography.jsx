import React from 'react';
import { cn } from '../../utils/cn';

export const Display = ({ children, className, as: Component = 'h1', ...props }) => {
  return (
    <Component
      className={cn(
        "font-heading text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Heading = ({ children, className, as: Component = 'h2', ...props }) => {
  return (
    <Component
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const SubHeading = ({ children, className, as: Component = 'h3', ...props }) => {
  return (
    <Component
      className={cn(
        "font-heading text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Body = ({ children, className, as: Component = 'p', ...props }) => {
  return (
    <Component
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Caption = ({ children, className, as: Component = 'p', ...props }) => {
  return (
    <Component
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Label = ({ children, className, as: Component = 'label', ...props }) => {
  return (
    <Component
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
