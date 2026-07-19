import React from 'react';
import { SectionHeader } from '../ui/Shared/SectionHeader';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const LearningProgress = ({ data = [] }) => {
  // We use sample data if empty to show how the chart looks
  const chartData = data.length > 0 ? data : [
    { name: 'Mon', score: 20 },
    { name: 'Tue', score: 35 },
    { name: 'Wed', score: 45 },
    { name: 'Thu', score: 40 },
    { name: 'Fri', score: 65 },
    { name: 'Sat', score: 85 },
    { name: 'Sun', score: 90 },
  ];

  return (
    <div>
      <SectionHeader 
        title="Learning Progress" 
        subtitle="Your readiness score over the past week."
      />
      <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
