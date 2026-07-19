import express from 'express';
import { uploadResume, getResumes, getResumeById, deleteResume } from '../controllers/resumeController.js';
import { upload } from '../services/uploadService.js';

const router = express.Router();

// Middleware can be added here for auth (e.g., protect)
router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getResumes);
router.get('/:id', getResumeById);
router.delete('/:id', deleteResume);

export default router;
