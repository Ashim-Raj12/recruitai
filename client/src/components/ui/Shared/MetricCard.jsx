import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, // positive | negative | neutral
  trendValue,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={20} />
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        
        {trendValue && (
          <div className={`flex items-center text-sm font-medium
            ${trend === 'positive' ? 'text-success' : ''}
            ${trend === 'negative' ? 'text-destructive' : ''}
            ${trend === 'neutral' ? 'text-muted-foreground' : ''}
          `}>
            {trend === 'positive' && <TrendingUp size={16} className="mr-1" />}
            {trend === 'negative' && <TrendingDown size={16} className="mr-1" />}
            {trend === 'neutral' && <Minus size={16} className="mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
    </motion.div>
  );
};
