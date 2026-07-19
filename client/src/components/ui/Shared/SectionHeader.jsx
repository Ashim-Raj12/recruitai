import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SectionHeader = ({ title, subtitle, actionLabel, actionHref, onAction }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-1">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      {actionLabel && (
        actionHref ? (
          <Link 
            to={actionHref} 
            className="text-sm font-medium text-primary hover:underline flex items-center group"
          >
            {actionLabel}
            <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <button 
            onClick={onAction}
            className="text-sm font-medium text-primary hover:underline flex items-center group"
          >
            {actionLabel}
            <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        )
      )}
    </div>
  );
};
