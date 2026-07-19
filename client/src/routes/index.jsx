import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layouts
import RootLayout from '../layouts/RootLayout';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Wrappers
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Lazy load pages for performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Contact = lazy(() => import('../pages/Contact'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Resume = lazy(() => import('../pages/Resume'));
const UploadResume = lazy(() => import('../pages/UploadResume'));
const ResumeAnalyzer = lazy(() => import('../pages/ResumeAnalyzer'));
const MockInterview = lazy(() => import('../pages/MockInterview'));
const CodingInterview = lazy(() => import('../pages/CodingInterview'));
const CareerCoach = lazy(() => import('../pages/CareerCoach'));
const Chat = lazy(() => import('../pages/Chat'));
const History = lazy(() => import('../pages/History'));
const Jobs = lazy(() => import('../pages/Jobs'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Suspense fallback
const SuspenseFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public Layout Routes (Always accessible or partially accessible)
      {
        element: <PublicLayout />,
        children: [
          { path: '/', element: <Suspense fallback={<SuspenseFallback />}><Home /></Suspense> },
          { path: '/about', element: <Suspense fallback={<SuspenseFallback />}><About /></Suspense> },
          { path: '/pricing', element: <Suspense fallback={<SuspenseFallback />}><Pricing /></Suspense> },
          { path: '/contact', element: <Suspense fallback={<SuspenseFallback />}><Contact /></Suspense> },
        ],
      },
      // Auth Layout Routes (Only for unauthenticated users)
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: '/login', element: <Suspense fallback={<SuspenseFallback />}><Login /></Suspense> },
              { path: '/register', element: <Suspense fallback={<SuspenseFallback />}><Register /></Suspense> },
              { path: '/forgot-password', element: <Suspense fallback={<SuspenseFallback />}><ForgotPassword /></Suspense> },
            ],
          },
        ],
      },
      // Dashboard Layout Routes (Only for authenticated users)
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: '/dashboard', element: <Suspense fallback={<SuspenseFallback />}><Dashboard /></Suspense> },
              { path: '/profile', element: <Suspense fallback={<SuspenseFallback />}><Profile /></Suspense> },
              { path: '/settings', element: <Suspense fallback={<SuspenseFallback />}><Settings /></Suspense> },
              { path: '/resume', element: <Suspense fallback={<SuspenseFallback />}><Resume /></Suspense> },
              { path: '/resume/upload', element: <Suspense fallback={<SuspenseFallback />}><UploadResume /></Suspense> },
              { path: '/resume/analyzer', element: <Suspense fallback={<SuspenseFallback />}><ResumeAnalyzer /></Suspense> },
              { path: '/mock-interview', element: <Suspense fallback={<SuspenseFallback />}><MockInterview /></Suspense> },
              { path: '/coding-interview', element: <Suspense fallback={<SuspenseFallback />}><CodingInterview /></Suspense> },
              { path: '/career-coach', element: <Suspense fallback={<SuspenseFallback />}><CareerCoach /></Suspense> },
              { path: '/chat', element: <Suspense fallback={<SuspenseFallback />}><Chat /></Suspense> },
              { path: '/history', element: <Suspense fallback={<SuspenseFallback />}><History /></Suspense> },
              { path: '/jobs', element: <Suspense fallback={<SuspenseFallback />}><Jobs /></Suspense> },
            ],
          },
        ],
      },
      // 404 Route
      {
        path: '*',
        element: <Suspense fallback={<SuspenseFallback />}><NotFound /></Suspense>,
      },
    ],
  },
]);
