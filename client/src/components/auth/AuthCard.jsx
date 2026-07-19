import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AuthCard = ({ children, title, subtitle, backLink }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      {/* Background ambient glow - reduced size for side layout */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="bg-card border border-border/60 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
          {children}
        </div>

        {backLink && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {backLink}
          </div>
        )}
      </motion.div>
    </div>
  );
};
