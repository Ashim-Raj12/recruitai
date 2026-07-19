import React from 'react';
import { useAuthStore } from '../store/authStore';

// Widgets
import { DashboardHero } from '../components/dashboard/DashboardHero';
import { AICopilotWidget } from '../components/dashboard/AICopilotWidget';
import { MissionChecklist } from '../components/dashboard/MissionChecklist';
import { CareerHealth } from '../components/dashboard/CareerHealth';
import { CareerRoadmap } from '../components/dashboard/CareerRoadmap';
import { ResumeCenterWidget } from '../components/dashboard/ResumeCenterWidget';
import { InterviewCenterWidget } from '../components/dashboard/InterviewCenterWidget';
import { CodingCenterWidget } from '../components/dashboard/CodingCenterWidget';
import { JobTrackerWidget } from '../components/dashboard/JobTrackerWidget';
import { AIInsights } from '../components/dashboard/AIInsights';
import { LearningProgress } from '../components/dashboard/LearningProgress';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { QuickActions } from '../components/dashboard/QuickActions';
import { NotificationPanel } from '../components/dashboard/NotificationPanel';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-12 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Hero Section */}
      <section>
        <DashboardHero 
          userName={user?.fullName ? user.fullName.split(' ')[0] : 'User'} 
          currentStreak={0} 
          currentGoal={user?.careerGoal || "Complete Profile Setup"}
          onContinueLearning={() => console.log('Continue learning clicked')}
        />
      </section>

      {/* Top Grid: Copilot + Mission */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AICopilotWidget />
        <MissionChecklist />
      </section>

      {/* 2. Quick Actions */}
      <section>
        <QuickActions />
      </section>

      {/* 3. Career Health Metrics */}
      <section>
        <CareerHealth />
      </section>

      {/* 4. AI Insights */}
      <section>
        <AIInsights />
      </section>

      {/* Middle Grid: Roadmap & Progress */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CareerRoadmap />
        <LearningProgress />
      </section>

      {/* Bottom Grid: The 4 Centers */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResumeCenterWidget />
        <InterviewCenterWidget />
        <CodingCenterWidget />
        <JobTrackerWidget />
      </section>

      {/* Footer Grid: Activity & Notifications */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityTimeline />
        <NotificationPanel />
      </section>
      
    </div>
  );
};

export default Dashboard;
