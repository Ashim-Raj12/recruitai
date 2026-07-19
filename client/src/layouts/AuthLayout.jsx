import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, BrainCircuit, Rocket, Target } from 'lucide-react';
import { Logo } from '../components/ui/Logo';

const FloatingIcon = ({ children, delay, className, ...props }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute p-4 bg-background/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const AuthLayout = () => {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      {/* Left Panel - Hidden on Mobile */}
      <div className="relative hidden h-full w-1/2 flex-col bg-zinc-950 p-10 text-white lg:flex border-r border-border/50 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[120px]" 
          />
        </div>

        {/* Logo */}
        <div className="relative z-20 flex items-center">
          <Logo />
        </div>

        {/* Interactive / Animated Elements Area */}
        <div className="relative flex-1 flex items-center justify-center z-10 w-full">
          <FloatingIcon delay={0} className="top-1/4 left-1/4 -rotate-12 hover:rotate-0 hover:scale-110 transition-transform cursor-pointer">
            <Code2 size={32} className="text-blue-400" />
          </FloatingIcon>
          
          <FloatingIcon delay={1.5} className="top-1/3 right-1/4 rotate-12 hover:rotate-0 hover:scale-110 transition-transform cursor-pointer">
            <Target size={32} className="text-emerald-400" />
          </FloatingIcon>

          <FloatingIcon delay={3} className="bottom-1/3 left-1/3 rotate-6 hover:rotate-0 hover:scale-110 transition-transform cursor-pointer">
            <Rocket size={32} className="text-orange-400" />
          </FloatingIcon>

          <div className="text-center space-y-4 max-w-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white/80"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Career Growth
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-3xl font-bold leading-tight"
            >
              Master your interviews with real-time AI feedback.
            </motion.h2>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-20 mt-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <blockquote className="space-y-4">
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                "This platform has completely transformed how I prepare for my interviews and build my career. The AI insights are incredibly accurate."
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                    <span className="text-xs font-bold">SD</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Sofia Davis</div>
                  <div className="text-xs text-white/50">Frontend Engineer @ Vercel</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 h-full overflow-y-auto">
        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 lg:hidden z-50">
          <Logo />
        </div>

        <div className="w-full max-w-sm mt-12 lg:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
