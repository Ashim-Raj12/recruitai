import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative bg-primary text-primary-foreground overflow-hidden"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-center text-sm font-medium">
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-300" />
              <span>Resume Analyzer v2 is now live with enhanced ATS scoring!</span>
              <a href="/resume/analyzer" className="underline underline-offset-4 font-semibold hover:text-primary-foreground/80 transition-colors ml-1">
                Try it out
              </a>
            </span>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
              aria-label="Dismiss announcement"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
