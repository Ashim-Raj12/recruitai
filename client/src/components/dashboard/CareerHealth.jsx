import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { MetricCard } from '../ui/Shared/MetricCard';
import { FileText, ScanLine, MessageSquare, Code } from 'lucide-react';

export const CareerHealth = ({ metrics }) => {
  const defaultMetrics = [
    { title: "Resume Score", value: "0", icon: FileText, trend: "neutral", trendValue: "+0 pts" },
    { title: "ATS Readiness", value: "0%", icon: ScanLine, trend: "neutral", trendValue: "0%" },
    { title: "Interview Readiness", value: "0%", icon: MessageSquare, trend: "neutral", trendValue: "0%" },
    { title: "Coding Readiness", value: "0", icon: Code, trend: "neutral", trendValue: "0 solved" }
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div>
      <SectionHeader title="Career Health" subtitle="Your overall readiness for the job market." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayMetrics.map((m, idx) => (
          <MetricCard 
            key={idx}
            title={m.title}
            value={m.value}
            icon={m.icon}
            trend={m.trend}
            trendValue={m.trendValue}
            delay={idx * 0.1}
          />
        ))}
      </div>
    </div>
  );
};
