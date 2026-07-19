import mongoose from 'mongoose';

const resumeAnalysisSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  atsScore: {
    type: Number,
    required: true,
  },
  resumeScore: {
    type: Number,
    required: true,
  },
  strengths: [String],
  weaknesses: [String],
  missingSkills: [String],
  grammarSuggestions: [
    {
      original: String,
      suggestion: String,
      reason: String
    }
  ],
  formattingSuggestions: [String],
  keywordSuggestions: [String],
  recruiterFeedback: String,
  industryReadiness: String,
  actionPlan: [
    {
      step: Number,
      task: String,
      timeline: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
