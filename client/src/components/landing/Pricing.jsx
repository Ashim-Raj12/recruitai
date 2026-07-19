import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Heading, Body } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Cards';
import { FadeUp, StaggerChildren } from '../animations';

const pricingTiers = [
  {
    name: "Free",
    description: "Perfect for students getting started.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1 AI Resume Analysis per month",
      "Basic ATS keyword matching",
      "1 Mock Interview (Text only)",
      "Standard support"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    description: "For serious professionals actively applying.",
    monthlyPrice: 29,
    yearlyPrice: 19, // Billed annually at 228
    features: [
      "Unlimited AI Resume Analyses",
      "Advanced ATS scoring & rewriting",
      "Unlimited Voice Mock Interviews",
      "Interactive Coding IDE Practice",
      "24/7 AI Career Coach",
      "Priority email support"
    ],
    cta: "Start Free Trial",
    highlighted: true
  },
  {
    name: "Teams",
    description: "For career centers and bootcamps.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "Everything in Pro",
      "Up to 50 student seats",
      "Admin analytics dashboard",
      "Custom interview rubrics",
      "API access",
      "Dedicated success manager"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <Heading>Simple, transparent pricing.</Heading>
            <Body className="text-muted-foreground mt-4 text-lg mb-8">
              Invest in your career. Upgrade anytime.
            </Body>
            
            {/* Toggle */}
            <div className="inline-flex items-center p-1 bg-muted rounded-full">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isYearly ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">Save 30%</span>
              </button>
            </div>
          </FadeUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="h-full flex"
            >
              <Card 
                className={`w-full flex flex-col relative ${
                  tier.highlighted 
                    ? "border-primary shadow-2xl scale-100 md:scale-105 z-10 bg-card" 
                    : "border-border/50 bg-muted/10 scale-100"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={12} />
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl mb-2">{tier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6 mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold font-heading">
                      ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={18} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-6">
                  <Button 
                    className="w-full" 
                    variant={tier.highlighted ? "primary" : "outline"}
                    size="lg"
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
};

export default Pricing;
