import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { EmptyState } from '../ui/Shared/EmptyState';
import { Map } from 'lucide-react';

export const CareerRoadmap = ({ milestones = [] }) => {
  return (
    <div>
      <SectionHeader 
        title="Career Roadmap" 
        subtitle="Your path to landing the target role." 
        actionLabel="View Full Map"
        actionHref="/roadmap"
      />
      
      {milestones.length === 0 ? (
        <EmptyState 
          icon={Map}
          title="No Roadmap Generated"
          description="You haven't generated a personalized career roadmap yet. Let AI analyze your goals and build a path."
          actionLabel="Generate Roadmap"
          onAction={() => {}}
        />
      ) : (
        <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8">
          <div className="relative border-l-2 border-muted ml-3 space-y-8">
            {milestones.map((m, idx) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-card ${
                  m.status === 'completed' ? 'bg-primary' : 
                  m.status === 'current' ? 'bg-orange-500 animate-pulse' : 'bg-muted'
                }`} />
                
                <div>
                  <h4 className={`text-base font-semibold ${m.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {m.title}
                  </h4>
                  {m.description && <p className="text-sm text-muted-foreground mt-1">{m.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
