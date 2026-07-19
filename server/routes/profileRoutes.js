import express from 'express';
import {
  getProfile,
  updateProfile,
  uploadAvatar
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getProfile)
  .patch(protect, updateProfile);

router.route('/avatar')
  .patch(protect, uploadAvatar);

export default router;
