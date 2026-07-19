import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { 
  CheckCircle, AlertTriangle, XCircle, TrendingUp, 
  Briefcase, GraduationCap, Award, Code, ArrowLeft, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

const ResumeAnalyzer = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    if (!resumeId) {
      setError("No resume ID provided.");
      setLoading(false);
      return;
    }

    const fetchResume = async () => {
      try {
        const response = await resumeService.getResumeById(resumeId);
        if (response.success) {
          setResumeData(response.data);
        } else {
          setError(response.message || "Failed to load resume.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching resume data.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loading Intelligence...</h2>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
        <button 
          onClick={() => navigate('/resume/upload')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const analysis = resumeData.analysisId;
  const parsed = resumeData.parsedData;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <button 
        onClick={() => navigate('/resume/upload')}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Upload
      </button>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Scores & Meta */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Score Card */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">ATS Compatibility</h2>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <circle
                  className={`${getScoreColor(analysis?.atsScore || 0)}`}
                  strokeWidth="10"
                  strokeDasharray={364.4}
                  strokeDashoffset={364.4 - (364.4 * (analysis?.atsScore || 0)) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{analysis?.atsScore || 0}</span>
                <span className="text-xs text-gray-500 font-medium">/ 100</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Overall Resume Score</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{analysis?.resumeScore || 0}/100</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className={`h-2 rounded-full ${getScoreBg(analysis?.resumeScore || 0)}`} style={{ width: `${analysis?.resumeScore || 0}%` }}></div>
              </div>
            </div>
          </motion.div>

          {/* Profile Meta */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Extracted Profile</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{parsed?.personalInfo?.firstName} {parsed?.personalInfo?.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{parsed?.personalInfo?.email || 'Not found'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">{parsed?.personalInfo?.phone || 'Not found'}</p>
              </div>
            </div>
          </motion.div>

          {/* Recruiter Feedback */}
          <motion.div variants={itemVariants} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-800 p-6">
             <div className="flex items-center mb-3 text-indigo-700 dark:text-indigo-400">
               <TrendingUp className="h-5 w-5 mr-2" />
               <h3 className="font-semibold">Recruiter's Take</h3>
             </div>
             <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
               {analysis?.recruiterFeedback || "No feedback generated."}
             </p>
          </motion.div>
        </div>

        {/* Right Column: Deep Insights */}
        <div className="lg:col-span-2 space-y-8">
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-green-100 dark:border-green-900/30 p-6">
              <div className="flex items-center mb-4 text-green-600 dark:text-green-500">
                <CheckCircle className="h-5 w-5 mr-2" />
                <h3 className="font-semibold text-lg">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {analysis?.strengths?.map((strength, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{strength}</span>
                  </li>
                )) || <li className="text-sm text-gray-500">None identified</li>}
              </ul>
            </div>

            {/* Weaknesses / Improvements */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/30 p-6">
              <div className="flex items-center mb-4 text-yellow-600 dark:text-yellow-500">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <h3 className="font-semibold text-lg">Areas to Improve</h3>
              </div>
              <ul className="space-y-3">
                {analysis?.weaknesses?.map((weakness, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{weakness}</span>
                  </li>
                )) || <li className="text-sm text-gray-500">None identified</li>}
              </ul>
            </div>
          </motion.div>

          {/* Missing Skills */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skill Gap Analysis</h3>
            <div className="flex flex-wrap gap-2">
              {analysis?.missingSkills?.map((skill, idx) => (
                <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50">
                  <XCircle className="h-4 w-4 mr-1.5" />
                  {skill}
                </span>
              )) || <span className="text-sm text-gray-500">No major gaps identified</span>}
            </div>
          </motion.div>

          {/* Action Plan */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Your Action Plan</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
              {analysis?.actionPlan?.map((plan, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-800 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {plan.step}
                  </div>
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-gray-900 dark:text-white">{plan.timeline}</div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{plan.task}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default ResumeAnalyzer;
