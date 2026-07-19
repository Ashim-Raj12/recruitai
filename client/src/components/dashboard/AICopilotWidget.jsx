import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Send, Sparkles, FileText, Code2, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';

const SUGGESTIONS = [
  { icon: FileText, text: "Review my resume" },
  { icon: Briefcase, text: "Prepare me for Amazon" },
  { icon: Code2, text: "Generate React questions" },
  { icon: Sparkles, text: "Explain JWT" }
];

export const AICopilotWidget = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // In future: send to AI backend
      setInputValue('');
    }
  };

  return (
    <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BrainCircuit className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">AI Career Copilot</h2>
          <p className="text-sm text-muted-foreground">Ask anything about your career preparation</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button 
                key={i}
                onClick={() => setInputValue(s.text)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <Icon size={14} className="text-muted-foreground" />
                {s.text}
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="How can I help you today?"
          className="w-full h-14 pl-5 pr-14 rounded-2xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!inputValue.trim()}
          className="absolute right-2 top-2 h-10 w-10 rounded-xl"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};
