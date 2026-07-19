import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trash2, GripVertical } from 'lucide-react';

export const SectionCard = ({ 
  title, 
  subtitle, 
  isExpanded: forceExpanded,
  onRemove,
  dragHandleProps,
  children 
}) => {
  const [isExpanded, setIsExpanded] = useState(forceExpanded ?? false);

  return (
    <div className="border border-border/60 bg-card rounded-xl overflow-hidden mb-4 group transition-colors hover:border-border">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-background"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Drag Handle */}
          {dragHandleProps && (
            <div 
              {...dragHandleProps} 
              className="p-1 text-muted-foreground/30 hover:text-foreground cursor-grab active:cursor-grabbing transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical size={18} />
            </div>
          )}
          
          <div className="truncate">
            <h4 className="font-semibold text-sm truncate">{title || '(Not Specified)'}</h4>
            {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onRemove && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          )}
          <div className="p-1.5 text-muted-foreground">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-2 border-t border-border/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
