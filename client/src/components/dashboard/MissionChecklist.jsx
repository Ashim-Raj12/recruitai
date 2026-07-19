import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';
import { SectionHeader } from '../ui/Shared/SectionHeader';

export const MissionChecklist = ({ tasks = [] }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-sm">
      <SectionHeader 
        title="Today's Mission" 
        subtitle="Complete these tasks to stay on track." 
      />

      {tasks.length > 0 ? (
        <div className="space-y-6">
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          
          <div className="space-y-3">
            {tasks.map((task, idx) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                  task.completed 
                    ? 'bg-muted/30 border-transparent opacity-60' 
                    : 'bg-background border-border hover:border-primary/50 cursor-pointer'
                }`}
              >
                {task.completed ? (
                  <CheckCircle2 className="text-primary shrink-0" size={24} />
                ) : (
                  <Circle className="text-muted-foreground shrink-0" size={24} />
                )}
                <span className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed border-border rounded-2xl bg-muted/10">
          <p className="text-muted-foreground mb-4">You have no tasks scheduled for today.</p>
          <button className="text-primary font-medium text-sm hover:underline">Generate AI Mission</button>
        </div>
      )}
    </div>
  );
};
