import React from 'react';
import { motion } from 'framer-motion';

const CompletionProgress = ({ percentage }) => {
  return (
    <div className="bg-zinc-950 border border-border/50 rounded-2xl p-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Profile Completion</h3>
          <p className="text-sm text-white/50 mt-1">A complete profile unlocks better AI recommendations.</p>
        </div>
        <div className="text-2xl font-bold text-primary">{percentage}%</div>
      </div>
      
      <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary rounded-full relative"
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default CompletionProgress;
