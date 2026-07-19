import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  personalInfo: {
    phone: { type: String, default: '' },
    dateOfBirth: { type: Date },
    gender: { type: String, default: '' },
    country: { type: String, default: '' },
    state: { type: String, default: '' },
    city: { type: String, default: '' },
    timezone: { type: String, default: '' },
  },
  professionalInfo: {
    headline: { type: String, default: '' },
    currentRole: { type: String, default: '' },
    yearsOfExperience: { type: Number, default: 0 },
    employmentStatus: { type: String, default: '' },
    currentCompany: { type: String, default: '' },
    expectedSalary: { type: String, default: '' },
    preferredSalary: { type: String, default: '' },
    preferredJobType: { type: String, default: '' }, // Remote, Hybrid, Onsite
    noticePeriod: { type: String, default: '' },
  },
  careerGoals: {
    careerGoal: { type: String, default: '' },
    targetRole: { type: String, default: '' },
    targetCompanies: [{ type: String }],
    preferredIndustry: { type: String, default: '' },
    dreamCompany: { type: String, default: '' },
    targetCountry: { type: String, default: '' },
    targetLocation: { type: String, default: '' },
    availableForWork: { type: Boolean, default: true },
  },
  skills: [{
    name: { type: String },
    category: { type: String }, // Frontend, Backend, etc.
  }],
  education: [{
    institution: { type: String },
    degree: { type: String },
    branch: { type: String },
    cgpa: { type: String },
    startYear: { type: String },
    endYear: { type: String },
    description: { type: String },
  }],
  experience: [{
    company: { type: String },
    role: { type: String },
    employmentType: { type: String },
    location: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    currentJob: { type: Boolean, default: false },
    responsibilities: { type: String },
    achievements: { type: String },
    technologiesUsed: [{ type: String }],
  }],
  projects: [{
    projectName: { type: String },
    techStack: [{ type: String }],
    github: { type: String },
    liveLink: { type: String },
    description: { type: String },
    achievements: { type: String },
  }],
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    leetcode: { type: String, default: '' },
    codeforces: { type: String, default: '' },
    hackerrank: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  preferences: {
    theme: { type: String, default: 'dark' },
    language: { type: String, default: 'English' },
    emailNotifications: { type: Boolean, default: true },
    interviewReminders: { type: Boolean, default: true },
    weeklyReports: { type: Boolean, default: true },
    aiSuggestions: { type: Boolean, default: true },
    jobAlerts: { type: Boolean, default: true },
  },
  completionPercentage: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
