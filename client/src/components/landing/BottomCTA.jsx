import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Heading, Body } from '../ui/Typography';
import { Button } from '../ui/Button';
import { FadeUp } from '../animations';
import { Link } from 'react-router-dom';

const BottomCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden border-t border-border/50">
      {/* Background gradients for premium feel */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-[100%] blur-3xl -z-10 pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <FadeUp className="max-w-3xl mx-auto">
          <Heading className="text-4xl md:text-5xl lg:text-6xl mb-6">
            Ready to land your dream job?
          </Heading>
          
          <Body className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers with our AI copilot. No credit card required to start.
          </Body>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-10 text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform group">
                Start Free
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground sm:hidden mt-2">7-day guarantee on Pro plans.</p>
          </div>
          
          <p className="hidden sm:block text-sm text-muted-foreground mt-6">
            7-day money-back guarantee on all Pro plans.
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

export default BottomCTA;
