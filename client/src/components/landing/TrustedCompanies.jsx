import React from 'react';
import { motion } from 'framer-motion';
import { Body } from '../ui/Typography';

// Note: Using simple text/SVG approximations to keep it clean and premium without real logo SVGs taking up space.
const companies = [
  "Google", "Microsoft", "Amazon", "Adobe", "Meta", "Netflix", "Flipkart", "Uber"
];

const TrustedCompanies = () => {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <Body className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Interview questions inspired by leading companies
        </Body>
      </div>
      
      <div className="relative w-full flex overflow-x-hidden">
        {/* Gradient Masks for smooth fading edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex whitespace-nowrap items-center gap-16 lg:gap-24 px-8"
          animate={{ x: [0, -1035] }} // Adjust based on width, but seamless marquee technique is to duplicate array
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...companies, ...companies, ...companies].map((company, index) => (
            <div 
              key={index} 
              className="font-heading font-bold text-2xl md:text-3xl text-foreground/40 hover:text-foreground/80 transition-colors select-none"
            >
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
