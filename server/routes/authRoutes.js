import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  refreshToken,
  verifyEmail,
  resendVerification,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/refresh', refreshToken);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

export default router;
