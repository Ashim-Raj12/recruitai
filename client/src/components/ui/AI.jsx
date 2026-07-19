import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { Card, CardContent } from './Cards';
import { Avatar } from './Profile';

export const AIBadge = ({ className }) => (
  <span className={cn("inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary", className)}>
    <Sparkles size={12} />
    AI Generated
  </span>
);

export const AIChatBubble = ({ isUser, message, avatarSrc, className }) => {
  return (
    <div className={cn("flex w-full gap-4", isUser ? "flex-row-reverse" : "flex-row", className)}>
      <Avatar
        size="sm"
        src={avatarSrc}
        fallback={isUser ? <User size={14} /> : <Bot size={14} />}
        className={cn("shrink-0 mt-1", isUser ? "bg-secondary" : "bg-primary text-primary-foreground")}
      />
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm",
          isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"
        )}
      >
        <p className="leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
};

export const TypingIndicator = ({ className }) => (
  <div className={cn("flex items-center gap-1 rounded-2xl bg-muted px-4 py-3 w-fit rounded-tl-sm", className)}>
    <motion.div
      className="h-1.5 w-1.5 rounded-full bg-foreground/50"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
    />
    <motion.div
      className="h-1.5 w-1.5 rounded-full bg-foreground/50"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
    />
    <motion.div
      className="h-1.5 w-1.5 rounded-full bg-foreground/50"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
    />
  </div>
);

export const AIResponseCard = ({ title, children, isGenerating, className }) => (
  <Card className={cn("relative overflow-hidden border-primary/20 bg-primary/5", className)}>
    <div className="flex items-center justify-between border-b border-primary/10 bg-background/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 font-medium text-primary">
        <Sparkles size={16} />
        {title}
      </div>
      {isGenerating && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
    </div>
    <CardContent className="p-4">
      {children}
    </CardContent>
  </Card>
);

export const PromptCard = ({ title, description, icon: Icon, onClick, className }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-start gap-2 rounded-xl border bg-card p-4 text-left text-sm transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
  >
    {Icon && <Icon className="h-5 w-5 text-primary" />}
    <span className="font-semibold">{title}</span>
    {description && <span className="text-muted-foreground">{description}</span>}
  </button>
);

export const SuggestedPrompt = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={cn(
      "inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
  >
    {text}
  </button>
);

export const ConversationContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-6 overflow-y-auto p-4", className)}>
    {children}
  </div>
);

export const ThinkingAnimation = ({ text = "AI is thinking", className }) => (
  <div className={cn("flex items-center gap-3 text-sm text-muted-foreground", className)}>
    <Loader2 className="h-4 w-4 animate-spin" />
    <span>{text}...</span>
  </div>
);
