import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { Lightbulb } from 'lucide-react';

export const AIInsights = ({ insights = [] }) => {
  const defaultInsights = [
    { title: "Improve React Projects", description: "Your portfolio lacks state management projects. Consider building a dashboard.", type: "skill" },
    { title: "Practice Dynamic Programming", description: "Your mock interviews show weakness in DP. Try these 5 LeetCode problems.", type: "coding" },
    { title: "Resume Impact", description: "Your recent work experience lacks metric-driven achievements.", type: "resume" }
  ];

  const displayInsights = insights.length > 0 ? insights : defaultInsights;

  return (
    <div>
      <SectionHeader 
        title="AI Insights" 
        subtitle="Personalized recommendations based on your activity."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayInsights.map((insight, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border/60 rounded-2xl p-5 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-primary" />
              <h4 className="font-semibold text-sm">{insight.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{insight.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
