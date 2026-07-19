import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const DashboardHero = ({ userName = "Ashim", currentStreak = 0, currentGoal = "No goal set", onContinueLearning }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-zinc-950 text-white p-8 sm:p-12 border border-border/50">
      {/* Animated Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/4 w-[80%] h-[150%] bg-primary/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/2 -left-1/4 w-[60%] h-[100%] bg-purple-500/20 rounded-full blur-[100px]" 
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white/80"
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            AI Copilot Active
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Good Morning, {userName}.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-xl"
          >
            Continue preparing for your next career milestone. Your AI copilot is ready.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                <Target size={18} className="text-primary" />
                <div>
                  <div className="text-xs text-white/50">Current Goal</div>
                  <div className="text-sm font-semibold">{currentGoal}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                <Flame size={18} className="text-orange-500" />
                <div>
                  <div className="text-xs text-white/50">Streak</div>
                  <div className="text-sm font-semibold">{currentStreak} Days</div>
                </div>
              </div>
            </div>
            
            <Button onClick={onContinueLearning} size="lg" className="w-full bg-white text-black hover:bg-white/90">
              Continue Learning <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
