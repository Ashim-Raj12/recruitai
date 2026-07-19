import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileSearch, Mic, TrendingUp, Trophy } from 'lucide-react';
import { Heading, Body } from '../ui/Typography';
import { FadeUp } from '../animations';

const steps = [
  { icon: UploadCloud, title: "Upload Resume", desc: "Start by parsing your existing resume." },
  { icon: FileSearch, title: "AI Analysis", desc: "Get instantly scored against ATS standards." },
  { icon: Mic, title: "Practice Interviews", desc: "Simulate real interviews based on your profile." },
  { icon: TrendingUp, title: "Improve", desc: "Iterate using targeted AI feedback." },
  { icon: Trophy, title: "Get Hired", desc: "Land your dream job with confidence." }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <FadeUp>
          <Heading className="mb-4">How it works</Heading>
          <Body className="text-muted-foreground max-w-2xl mx-auto mb-16">
            A clear path from application to offer letter.
          </Body>
        </FadeUp>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-0.5 bg-border -z-10" />
          
          {/* Connector Line Fill (Animated) */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-[45px] left-[10%] h-0.5 bg-primary -z-10" 
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex flex-col items-center relative"
              >
                <div className="w-24 h-24 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center mb-6 relative group hover:border-primary/50 transition-colors">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold border-4 border-background">
                    {index + 1}
                  </div>
                  <step.icon size={32} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed px-2">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
