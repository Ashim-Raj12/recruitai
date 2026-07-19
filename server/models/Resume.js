import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  current: Boolean,
  description: String,
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  location: String,
  startDate: String,
  endDate: String,
  current: Boolean,
  description: String,
});

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  parsedData: {
    personalInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      portfolio: String,
    },
    summary: String,
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema],
    projects: [
      {
        title: String,
        description: String,
        url: String,
        technologies: [String]
      }
    ]
  },
  rawText: {
    type: String,
  },
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ResumeAnalysis'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Resume', resumeSchema);
