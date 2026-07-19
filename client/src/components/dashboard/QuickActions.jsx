import React from 'react';
import { motion } from 'framer-motion';
import { Upload, MessageSquare, Code2, BrainCircuit, Zap } from 'lucide-react';
import { SectionHeader } from '../ui/Shared/SectionHeader';

export const QuickActions = () => {
  const actions = [
    { label: "Upload Resume", icon: Upload, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Mock Interview", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Practice Code", icon: Code2, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Ask AI Copilot", icon: BrainCircuit, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div>
      <SectionHeader title="Quick Actions" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center justify-center p-6 bg-card border border-border/60 rounded-2xl hover:border-primary/50 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
