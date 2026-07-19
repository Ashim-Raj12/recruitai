import React from 'react';
import { motion } from 'framer-motion';
import { FileWarning, BrainCircuit, Target, AlertTriangle } from 'lucide-react';
import { Heading, Body } from '../ui/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Cards';
import { FadeUp, StaggerChildren } from '../animations';

const problems = [
  {
    icon: FileWarning,
    title: "Resume Rejections",
    description: "75% of resumes are never seen by human eyes. They are filtered out by ATS systems before you even get a chance.",
    color: "text-destructive",
    bg: "bg-destructive/10"
  },
  {
    icon: BrainCircuit,
    title: "Interview Anxiety",
    description: "Nerves and lack of practice lead to poor performance in high-stakes interviews, even for highly qualified candidates.",
    color: "text-warning",
    bg: "bg-warning/10"
  },
  {
    icon: Target,
    title: "Skill Gaps",
    description: "Not knowing exactly which skills you're missing for a specific role wastes months of unfocused learning.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: AlertTriangle,
    title: "Poor ATS Scores",
    description: "Using the wrong keywords or formatting means your perfectly good experience is parsed incorrectly by automated systems.",
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  }
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <Heading>Job searching is broken.</Heading>
            <Body className="text-muted-foreground mt-4 text-lg">
              The modern hiring process is optimized for companies, not candidates. 
              Navigating it alone is frustrating, time-consuming, and highly inefficient.
            </Body>
          </FadeUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
            >
              <Card className="h-full border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${problem.bg} ${problem.color}`}>
                    <problem.icon size={24} />
                  </div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
};

export default ProblemSection;
