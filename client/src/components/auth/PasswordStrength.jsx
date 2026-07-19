import React from 'react';
import { motion } from 'framer-motion';

export const PasswordStrength = ({ password }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, label: '', color: 'bg-muted' };

    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 0:
      case 1:
        return { score, label: 'Weak', color: 'bg-destructive' };
      case 2:
        return { score, label: 'Fair', color: 'bg-warning' };
      case 3:
        return { score, label: 'Good', color: 'bg-primary' };
      case 4:
        return { score, label: 'Strong', color: 'bg-success' };
      default:
        return { score: 0, label: '', color: 'bg-muted' };
    }
  };

  const strength = getStrength(password);

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
        {[1, 2, 3, 4].map((level) => (
          <motion.div
            key={level}
            initial={{ backgroundColor: 'var(--color-muted)' }}
            animate={{ 
              backgroundColor: level <= strength.score 
                ? `var(--color-${strength.color.replace('bg-', '')})` 
                : 'var(--color-muted)' 
            }}
            transition={{ duration: 0.3 }}
            className={`flex-1 ${level <= strength.score ? strength.color : 'bg-muted'} opacity-${level <= strength.score ? '100' : '30'}`}
          />
        ))}
      </div>
      {strength.label && (
        <p className={`text-xs ${strength.color.replace('bg-', 'text-')}`}>
          {strength.label} password
        </p>
      )}
    </div>
  );
};
