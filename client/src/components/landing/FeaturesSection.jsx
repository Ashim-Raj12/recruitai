import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Code2, Presentation, TrendingUp } from 'lucide-react';
import { Heading, Body } from '../ui/Typography';
import { Button } from '../ui/Button';

const FeatureRow = ({ title, description, icon: Icon, reverse, imageContent }) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center py-20`}>
    <div className="w-full lg:w-1/2 flex flex-col items-start">
      <div className="p-3 bg-primary/10 rounded-2xl mb-6">
        <Icon size={28} className="text-primary" />
      </div>
      <Heading className="mb-4">{title}</Heading>
      <Body className="text-muted-foreground text-lg mb-8 leading-relaxed">
        {description}
      </Body>
      <Button variant="ghost" className="group px-0 hover:bg-transparent hover:text-primary">
        Learn more 
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
    
    <div className="w-full lg:w-1/2">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full aspect-[4/3] rounded-2xl bg-muted/30 border border-border/50 shadow-2xl overflow-hidden flex items-center justify-center p-8 relative"
      >
        {/* Abstract beautiful illustration background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
        {imageContent}
      </motion.div>
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <FeatureRow 
          icon={FileText}
          title="AI Resume Analyzer & Builder"
          description="Upload your resume and get instant, actionable feedback. Our AI acts like a strict recruiter, identifying missing keywords, weak bullet points, and formatting issues that cause ATS rejection."
          imageContent={
            <div className="w-full h-full bg-card rounded-xl border border-border shadow-lg p-6 flex flex-col gap-4">
              <div className="h-4 w-1/3 bg-muted rounded" />
              <div className="space-y-2 mt-4">
                <div className="h-3 w-full bg-muted/50 rounded" />
                <div className="h-3 w-5/6 bg-muted/50 rounded" />
                <div className="h-3 w-4/6 bg-muted/50 rounded" />
              </div>
              <div className="mt-auto p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-sm font-medium text-destructive">Missing quantifiable metrics</span>
              </div>
            </div>
          }
        />

        <FeatureRow 
          icon={Presentation}
          title="Hyper-Realistic Mock Interviews"
          description="Practice behavioral and technical interviews via voice or text. The AI adapts to your resume and the specific job description you provide, asking challenging follow-up questions."
          reverse
          imageContent={
            <div className="w-full h-full bg-card rounded-xl border border-border shadow-lg flex flex-col">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xs font-bold">AI</span>
                </div>
                <div className="font-medium text-sm">Product Manager Interview</div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-end gap-4">
                <div className="bg-muted p-3 rounded-lg rounded-tl-sm text-sm self-start max-w-[80%]">
                  Tell me about a time you had to pivot a product strategy based on user feedback.
                </div>
                <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-sm text-sm self-end max-w-[80%]">
                  In my last role, we noticed high drop-off during onboarding...
                </div>
              </div>
            </div>
          }
        />

        <FeatureRow 
          icon={Code2}
          title="Interactive Coding Challenges"
          description="Ace your technical screens. Solve algorithms in our in-browser IDE while the AI copilot acts as your pair programmer, evaluating your logic, time complexity, and code cleanliness."
          imageContent={
            <div className="w-full h-full bg-[#1e1e1e] rounded-xl shadow-lg border border-border overflow-hidden flex flex-col font-mono text-sm">
              <div className="flex px-4 py-2 bg-[#2d2d2d] gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="p-4 text-green-400 flex-1">
                <span className="text-pink-400">function</span> <span className="text-blue-400">twoSum</span>(nums, target) {'{\n'}
                {'  '}const map = new <span className="text-yellow-400">Map</span>();{'\n'}
                {'  '}<span className="text-pink-400">for</span> (let i = 0; i &lt; nums.length; i++) {'{\n'}
                {'    '}const diff = target - nums[i];{'\n'}
                {'    '}// AI: Good use of Hash Map for O(n) time.{'\n'}
                {'  }'}{'\n'}
                {'}'}
              </div>
            </div>
          }
        />

      </div>
    </section>
  );
};

export default FeaturesSection;
