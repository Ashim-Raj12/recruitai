import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Specialized Cards

export const HoverCard = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    <Card ref={ref} className={cn("transition-colors hover:border-primary/50", className)} {...props}>
      {children}
    </Card>
  </motion.div>
));
HoverCard.displayName = "HoverCard";

export const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <HoverCard className={cn("p-6", className)}>
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="h-6 w-6" />
    </div>
    <CardTitle className="mb-2 text-lg">{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </HoverCard>
);

export const StatisticsCard = ({ title, value, trend, trendValue, icon: Icon, className }) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={cn("text-xs mt-1", trend === 'up' ? "text-success" : "text-destructive")}>
          {trend === 'up' ? '+' : '-'}{trendValue} from last month
        </p>
      )}
    </CardContent>
  </Card>
);
