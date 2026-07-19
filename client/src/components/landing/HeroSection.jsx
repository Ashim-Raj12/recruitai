import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, CheckCircle2, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { Display, Body } from '../ui/Typography';
import { Card } from '../ui/Cards';
import { FadeUp, FadeRight, FadeLeft, HoverLift, StaggerChildren } from '../animations';
import { Link } from 'react-router-dom';

const FloatingCard = ({ icon: Icon, title, value, colorClass, delay, positionClass }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className={`absolute z-20 hidden md:block ${positionClass}`}
  >
    <HoverLift>
      <Card className="flex items-center gap-3 p-3 shadow-xl bg-background/90 backdrop-blur-sm border-border/50">
        <div className={`p-2 rounded-full ${colorClass}`}>
          <Icon size={18} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-sm font-bold leading-none mt-1">{value}</p>
        </div>
      </Card>
    </HoverLift>
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>The Future of Job Searching</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <Display className="mb-6 leading-[1.1]">
                Your AI Career Copilot for Landing Better Jobs.
              </Display>
            </FadeUp>
            
            <FadeUp delay={0.3}>
              <Body className="text-xl text-muted-foreground mb-8 max-w-lg mt-0">
                Optimize your resume, practice interviews, and get personalized coaching from an intelligent AI designed to get you hired.
              </Body>
            </FadeUp>
            
            <FadeUp delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 text-base">
                  Start Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 text-base group">
                <Play size={18} className="mr-2 group-hover:text-primary transition-colors" />
                Watch Demo
              </Button>
            </FadeUp>
            
            <FadeUp delay={0.5} className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Join 10,000+ professionals hired last month.</p>
            </FadeUp>
          </div>
          
          {/* Right Content - Mockup */}
          <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
            
            {/* The Main Mockup Container */}
            <FadeLeft delay={0.3} className="relative z-10 w-full max-w-md aspect-[4/5] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col">
              
              {/* Mockup Header */}
              <div className="h-12 border-b border-border flex items-center px-4 gap-2 bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="mx-auto text-xs font-medium text-muted-foreground bg-background px-4 py-1 rounded-md border border-border">
                  recruitai.app / analyzer
                </div>
              </div>
              
              {/* Mockup Body */}
              <div className="flex-1 p-6 flex flex-col gap-4 bg-background">
                <div className="w-full h-8 bg-muted rounded-md w-3/4 animate-pulse" />
                <div className="w-full h-4 bg-muted/50 rounded-md animate-pulse" />
                <div className="w-full h-4 bg-muted/50 rounded-md w-5/6 animate-pulse" />
                <div className="w-full h-4 bg-muted/50 rounded-md w-4/6 animate-pulse" />
                
                <div className="mt-6 p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2 text-primary font-medium mb-2">
                    <Sparkles size={16} />
                    AI Feedback
                  </div>
                  <div className="text-sm text-foreground/80 leading-relaxed">
                    Your experience section is strong, but adding quantifiable metrics will increase your ATS score by 15%. Consider changing "Improved performance" to "Increased load speed by 40%".
                  </div>
                </div>
              </div>
              
            </FadeLeft>

            {/* Floating Elements */}
            <FloatingCard 
              icon={TrendingUp} 
              title="ATS Score" 
              value="92 / 100" 
              colorClass="bg-success"
              delay={0.6}
              positionClass="-left-12 top-20"
            />
            
            <FloatingCard 
              icon={CheckCircle2} 
              title="Resume Analysis" 
              value="Optimized" 
              colorClass="bg-primary"
              delay={0.8}
              positionClass="-right-8 top-40"
            />
            
            <FloatingCard 
              icon={MessageSquare} 
              title="Interview Score" 
              value="Excellent" 
              colorClass="bg-warning"
              delay={1.0}
              positionClass="-left-6 bottom-32"
            />
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
