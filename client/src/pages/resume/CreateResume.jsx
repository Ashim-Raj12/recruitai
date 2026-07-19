import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const TEMPLATES = [
  { id: 'blank', name: 'Blank Canvas', desc: 'Start from scratch', icon: FileText },
  { id: 'modern', name: 'Modern ATS', desc: 'Clean, parseable design', icon: Sparkles, recommended: true },
  { id: 'minimal', name: 'Minimalist', desc: 'Elegant typography', icon: FileText },
  { id: 'executive', name: 'Executive', desc: 'For senior roles', icon: FileText },
];

export const CreateResume = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (templateId) => {
    // In future: Initialize resumeStore with this template
    navigate('/resume/builder/new');
  };

  return (
    <div className="flex-1 overflow-auto bg-background p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4"
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Choose a starting point
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Select a template. You can easily switch designs or change layouts later.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {TEMPLATES.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div 
                key={t.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectTemplate(t.id)}
                className={`relative group cursor-pointer p-6 rounded-3xl border transition-colors flex flex-col justify-between min-h-[160px] ${
                  t.recommended 
                    ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' 
                    : 'border-border/60 bg-card hover:border-primary/30'
                }`}
              >
                {t.recommended && (
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 bg-primary text-primary-foreground rounded-full">
                    Recommended
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl bg-background border shadow-sm flex items-center justify-center mb-4">
                  <Icon size={20} className={t.recommended ? 'text-primary' : 'text-foreground'} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </div>
  );
};

export default CreateResume;
