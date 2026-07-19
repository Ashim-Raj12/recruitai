import React from 'react';
import { motion } from 'framer-motion';

export const FadeUp = ({ children, delay = 0, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeDown = ({ children, delay = 0, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeLeft = ({ children, delay = 0, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const FadeRight = ({ children, delay = 0, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const Scale = ({ children, delay = 0, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverLift = ({ children, className = '', ...props }) => (
  <motion.div
    whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
    whileTap={{ y: 0, transition: { duration: 0.1 } }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerChildren = ({ children, className = '', staggerDelay = 0.1, ...props }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    initial="hidden"
    animate="show"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
