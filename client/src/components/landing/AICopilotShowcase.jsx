import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heading, Body } from '../ui/Typography';
import { AIChatBubble, TypingIndicator, SuggestedPrompt } from '../ui/AI';

const AICopilotShowcase = () => {
  const [step, setStep] = useState(0);

  // Simple animation sequencer for the showcase
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500); // User message appears
    const timer2 = setTimeout(() => setStep(2), 2500); // AI typing
    const timer3 = setTimeout(() => setStep(3), 4500); // AI response
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section id="copilot" className="py-24 bg-muted/20 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading>Meet your new career coach.</Heading>
          <Body className="text-muted-foreground mt-4 text-lg">
            Available 24/7. Trained on thousands of successful tech interviews and resumes.
          </Body>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-background rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col h-[500px]">
            
            {/* Header */}
            <div className="h-16 border-b border-border flex items-center justify-center px-4 bg-muted/30">
              <span className="font-semibold text-sm">RecruitAI Career Coach</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              
              <AIChatBubble 
                isUser={false} 
                message="Hi! I'm your RecruitAI Copilot. How can I help you prepare for your job search today?" 
              />
              
              {step >= 1 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <AIChatBubble 
                    isUser={true} 
                    message="Review my resume for a Senior React Developer role at Stripe. What's missing?" 
                  />
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <TypingIndicator />
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <AIChatBubble 
                    isUser={false} 
                    message="I've analyzed your resume against Stripe's Senior Frontend engineering rubrics. You have strong React fundamentals, but you are missing two key areas:

1. Performance Optimization: Stripe values highly performant UIs. Add metrics about how you improved bundle size or rendering speeds (e.g., 'Reduced TTI by 40%').
2. System Design: Mention any complex state management architectures you designed from scratch.

Would you like me to rewrite your second experience bullet point to reflect this?" 
                  />
                </motion.div>
              )}

            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
              <div className="flex flex-wrap gap-2 mb-4">
                <SuggestedPrompt text="Help me negotiate an offer" />
                <SuggestedPrompt text="Mock interview for Google" />
                <SuggestedPrompt text="Improve my LinkedIn summary" />
              </div>
              <div className="relative">
                <div className="w-full h-12 bg-muted/50 rounded-lg border border-border flex items-center px-4 text-muted-foreground text-sm cursor-text hover:bg-muted/80 transition-colors">
                  Ask me anything about your career...
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AICopilotShowcase;
