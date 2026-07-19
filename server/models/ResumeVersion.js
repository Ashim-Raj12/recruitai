import mongoose from 'mongoose';

const resumeVersionSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  version: {
    type: Number,
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
  changes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('ResumeVersion', resumeVersionSchema);
