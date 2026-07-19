import Resume from '../models/Resume.js';
import ResumeAnalysis from '../models/ResumeAnalysis.js';
import ResumeVersion from '../models/ResumeVersion.js';
import { uploadToCloudinary } from '../services/uploadService.js';
import { extractTextFromPDF } from '../services/parseService.js';
import { analyzeResumeWithHF } from '../services/hfService.js';

// Mock user for now since auth isn't fully wired into the request object in the example
const MOCK_USER_ID = '60d0fe4f5311236168a109ca'; // Replace with req.user._id when auth middleware is added

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Cloudinary upload removed to save space (local analysis only)
    const fileUrl = "local_analysis_only";
    
    // 1. Extract Text
    const rawText = await extractTextFromPDF(req.file.buffer, req.file.originalname);

    // 2. AI Analysis (Hugging Face)
    const aiResult = await analyzeResumeWithHF(rawText);

    // 3. Save to DB
    const newResume = new Resume({
      userId: MOCK_USER_ID,
      fileUrl: fileUrl,
      fileName: req.file.originalname,
      parsedData: aiResult.parsedData,
      rawText: rawText,
    });

    const savedResume = await newResume.save();

    const newAnalysis = new ResumeAnalysis({
      resumeId: savedResume._id,
      ...aiResult.analysis
    });

    const savedAnalysis = await newAnalysis.save();

    // Link analysis to resume
    savedResume.analysisId = savedAnalysis._id;
    await savedResume.save();

    // Create initial version
    const newVersion = new ResumeVersion({
      resumeId: savedResume._id,
      version: 1,
      fileUrl: fileUrl,
      fileName: req.file.originalname,
      changes: ['Initial Upload']
    });
    await newVersion.save();

    res.status(201).json({
      success: true,
      data: {
        resume: savedResume,
        analysis: savedAnalysis
      }
    });

  } catch (error) {
    console.error('Upload Resume Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during upload' });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: MOCK_USER_ID }).populate('analysisId');
    res.status(200).json({ success: true, data: resumes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('analysisId');
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    // ensure user owns this resume
    if (resume.userId.toString() !== MOCK_USER_ID) {
       return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    if (resume.userId.toString() !== MOCK_USER_ID) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    
    await ResumeAnalysis.deleteOne({ resumeId: resume._id });
    await ResumeVersion.deleteMany({ resumeId: resume._id });
    await Resume.deleteOne({ _id: resume._id });

    res.status(200).json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
