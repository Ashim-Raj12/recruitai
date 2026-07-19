import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold tracking-tight hover:opacity-90 transition-opacity ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
        <BrainCircuit size={20} className="text-primary-foreground" />
      </div>
      <span className="text-xl">RecruitAI</span>
    </Link>
  );
};
