import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, Sparkles, Video, Mic, MicOff, Send } from 'lucide-react';
import { Heading, Body } from '../ui/Typography';
import { Tabs } from '../ui/Navigation';
import { Button } from '../ui/Button';
import { AIChatBubble, TypingIndicator } from '../ui/AI';
import { Avatar } from '../ui/Profile';

// Sub-components for interactivity
const ResumeInteractive = () => {
  const [accepted, setAccepted] = useState(false);
  return (
    <div className="flex h-full bg-muted/10 relative text-left">
      {/* Mock Resume Document */}
      <div className="flex-1 max-w-2xl mx-auto my-6 bg-card border shadow-sm rounded-lg p-8">
        <h1 className="text-2xl font-bold font-serif mb-1">Alex Johnson</h1>
        <p className="text-sm text-muted-foreground mb-6 border-b pb-4">Software Engineer | San Francisco, CA</p>
        
        <h2 className="text-lg font-bold mb-3 text-primary">Experience</h2>
        <div className="mb-4">
          <div className="flex justify-between font-medium">
            <span>Senior Developer at TechCorp</span>
            <span className="text-muted-foreground text-sm">2021 - Present</span>
          </div>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-foreground/80">
            <li>Led frontend architecture migration to React 18.</li>
            <li className={accepted ? "text-success font-medium bg-success/10 px-1 rounded" : "line-through text-muted-foreground"}>
              {accepted ? "Increased rendering speed by 40% and improved Lighthouse score to 98." : "Improved performance across the application."}
            </li>
            <li>Mentored 4 junior developers.</li>
          </ul>
        </div>
      </div>
      
      {/* AI Suggestion Panel */}
      {!accepted && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-8 top-32 w-72 bg-card border border-primary/30 shadow-2xl rounded-xl p-4 z-10"
        >
          <div className="flex items-center gap-2 text-primary font-medium mb-2 text-sm">
            <Sparkles size={14} /> AI Suggestion
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            "Improved performance" is too vague. ATS systems look for quantifiable metrics. Replace with:
          </p>
          <div className="text-sm bg-muted p-2 rounded border border-border mb-4 italic">
            "Increased rendering speed by 40% and improved Lighthouse score to 98."
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="w-full text-xs h-8">Dismiss</Button>
            <Button size="sm" className="w-full text-xs h-8" onClick={() => setAccepted(true)}>Apply Fix</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const InterviewInteractive = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpeaking(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#111] text-white">
      <div className="flex-1 p-6 flex flex-col md:flex-row gap-4 relative">
        {/* Main AI Caller */}
        <div className="flex-1 bg-[#222] rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#333]">
          <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-xs backdrop-blur-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" /> AI Interviewer
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isSpeaking ? 'bg-primary/20 scale-110' : 'bg-[#333]'}`}>
              <Avatar size="xl" fallback="AI" className="bg-primary text-primary-foreground border-4 border-[#222]" />
            </div>
            {isSpeaking && (
              <div className="flex gap-1 mt-6 h-6 items-center">
                {[1,2,3,4,5].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                    className="w-1.5 bg-primary rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Camera PiP */}
        <div className="absolute bottom-10 right-10 w-48 aspect-video bg-[#333] rounded-xl border-2 border-[#444] overflow-hidden flex items-center justify-center">
          <Avatar size="lg" fallback="You" className="bg-secondary text-secondary-foreground" />
          <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-[10px]">You</div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-20 bg-black flex items-center justify-center gap-4 px-6 border-t border-[#222]">
        <button className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#444] transition-colors">
          <Mic size={20} />
        </button>
        <button className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center hover:bg-[#444] transition-colors">
          <Video size={20} />
        </button>
        <button className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/80 transition-colors">
          <span className="w-4 h-4 rounded-sm bg-white" />
        </button>
      </div>
    </div>
  );
};

const CodingInteractive = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Success! All 15 test cases passed.\nTime: 45ms\nSpace: O(1)");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm text-left">
      <div className="flex items-center justify-between px-4 h-12 border-b border-[#333] bg-[#252526]">
        <div className="flex gap-4">
          <span className="text-white border-b border-primary px-2 py-3 text-xs">twoSum.js</span>
        </div>
        <Button size="sm" className="h-7 text-xs bg-success hover:bg-success/90 rounded" onClick={handleRun} isLoading={isRunning}>
          <Play size={14} className="mr-1" /> Run Code
        </Button>
      </div>
      
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 p-4 border-r border-[#333] overflow-hidden">
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">1</span><span className="text-gray-400">/**</span></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">2</span><span className="text-gray-400"> * @param {'{number[]}'} nums</span></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">3</span><span className="text-gray-400"> * @param {'{number}'} target</span></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">4</span><span className="text-gray-400"> * @return {'{number[]}'}</span></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">5</span><span className="text-gray-400"> */</span></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">6</span><div><span className="text-blue-400">const</span> <span className="text-yellow-200">twoSum</span> = <span className="text-blue-400">function</span>(nums, target) {'{'}</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">7</span><div className="pl-4"><span className="text-blue-400">const</span> map = <span className="text-blue-400">new</span> <span className="text-teal-300">Map</span>();</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">8</span><div className="pl-4"><span className="text-pink-400">for</span> (<span className="text-blue-400">let</span> i = 0; i &lt; nums.length; i++) {'{'}</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">9</span><div className="pl-8"><span className="text-blue-400">const</span> diff = target - nums[i];</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">10</span><div className="pl-8"><span className="text-pink-400">if</span> (map.has(diff)) {'{'}</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">11</span><div className="pl-12"><span className="text-pink-400">return</span> [map.get(diff), i];</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">12</span><div className="pl-8">{'}'}</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">13</span><div className="pl-8">map.set(nums[i], i);</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">14</span><div className="pl-4">{'}'}</div></div>
          <div className="flex text-gray-500 select-none mb-1 gap-4"><span className="w-4 text-right">15</span><div>{'};'}</div></div>
        </div>
        
        {/* Terminal/Output */}
        <div className="w-72 bg-[#1e1e1e] flex flex-col">
          <div className="px-4 py-2 border-b border-[#333] text-xs font-semibold uppercase text-gray-400">Console</div>
          <div className="p-4 flex-1 overflow-y-auto whitespace-pre-wrap text-xs">
            {isRunning && <span className="text-gray-400 animate-pulse">Running test cases...</span>}
            {output && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-success flex items-center gap-2 mb-2"><Check size={14} /> Accepted</div>
                {output}
              </motion.div>
            )}
            {!isRunning && !output && <span className="text-gray-500 italic">Click run to execute your code.</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoachInteractive = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I noticed you have an upcoming interview with Meta for the React Developer role. Do you want to review some common system design questions?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: "Great idea! For Meta's frontend system design, you should definitely focus on News Feed architecture. The key challenges there are pagination, state management for likes/comments, and optimistic UI updates. Shall we dive into the data model first?" }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background text-left">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <AIChatBubble 
            key={i} 
            isUser={msg.role === 'user'} 
            message={msg.text} 
            className="text-sm"
          />
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TypingIndicator />
          </motion.div>
        )}
      </div>
      <div className="p-4 border-t border-border bg-muted/20">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..." 
            className="w-full h-12 bg-background border border-border rounded-full pl-4 pr-12 text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

const previewContent = {
  resume: {
    title: "Resume Optimization",
    element: <ResumeInteractive />
  },
  interview: {
    title: "Mock Interview Dashboard",
    element: <InterviewInteractive />
  },
  coding: {
    title: "Coding Environment",
    element: <CodingInteractive />
  },
  coach: {
    title: "Career Coach Chat",
    element: <CoachInteractive />
  }
};

const InteractivePreview = () => {
  const [activeTab, setActiveTab] = useState('resume');

  const tabs = [
    { id: 'resume', label: 'Resume' },
    { id: 'interview', label: 'Interview' },
    { id: 'coding', label: 'Coding' },
    { id: 'coach', label: 'Career Coach' }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Heading className="mb-4">Experience the platform</Heading>
        <Body className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Everything you need to land your dream job, packed into one beautiful interface.
        </Body>

        <div className="max-w-4xl mx-auto">
          <Tabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
            className="mb-8 p-1.5 bg-background shadow-sm rounded-lg"
          />

          <div className="relative w-full aspect-[16/9] bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden flex flex-col">
            {/* Window Controls */}
            <div className="h-12 bg-background border-b border-border flex items-center px-4 z-20 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>
              <div className="mx-auto text-xs font-medium text-muted-foreground font-mono">
                recruitai.app / {activeTab}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-background overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full absolute inset-0"
                >
                  {previewContent[activeTab].element}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePreview;
