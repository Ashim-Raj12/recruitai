import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie } from '../utils/generateTokens.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedVerificationToken = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await User.create({
      fullName,
      email,
      password,
      verificationToken: hashedVerificationToken,
      verificationTokenExpire: Date.now() + 10 * 60 * 1000, // 10 minutes for OTP
    });

    const message = `Your verification code is: ${otp}. It expires in 10 minutes.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Email Verification Code - RecruitAI',
        message,
        html: `
          <h1>Welcome to RecruitAI!</h1>
          <p>Your email verification code is:</p>
          <h2 style="padding:10px;background:#2563eb;color:white;display:inline-block;border-radius:5px;letter-spacing:2px;">${otp}</h2>
          <p>This code expires in 10 minutes.</p>
        `
      });

      res.status(201).json({
        success: true,
        message: 'Verification code sent to email',
      });
    } catch (err) {
      console.log(err);
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.emailVerified) {
      return res.status(401).json({ success: false, message: 'Please verify your email first' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Set cookie
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isOnboarded: user.isOnboarded,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Email
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and verification code' });
    }

    // Get hashed token
    const verificationToken = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    const user = await User.findOne({
      email,
      verificationToken,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    // Set new properties
    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    
    // Auto login
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    await user.save();

    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isOnboarded: user.isOnboarded,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Refresh Token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req, res) => {
  try {
    console.log('Refresh route hit, cookies:', req.cookies);
    const token = req.cookies.recruit_refresh_token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      console.log('JWT verify failed:', err.message);
      return res.status(401).json({ success: false, message: 'Refresh token expired or invalid' });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    if (user.refreshToken !== token) {
      console.log('Token mismatch! DB token:', user.refreshToken, 'Cookie token:', token);
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.refreshToken = undefined;
      await user.save({ validateBeforeSave: false });
    }

    res.cookie('recruit_refresh_token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Resend Verification Email
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ success: false, message: 'Email is already verified' });
    }

    // Create a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedVerificationToken = crypto.createHash('sha256').update(otp).digest('hex');

    user.verificationToken = hashedVerificationToken;
    user.verificationTokenExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const message = `Your new verification code is: ${otp}. It expires in 10 minutes.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'New Email Verification Code - RecruitAI',
        message,
        html: `
          <h1>RecruitAI</h1>
          <p>Your new email verification code is:</p>
          <h2 style="padding:10px;background:#2563eb;color:white;display:inline-block;border-radius:5px;letter-spacing:2px;">${otp}</h2>
          <p>This code expires in 10 minutes.</p>
        `
      });

      res.status(200).json({
        success: true,
        message: 'Verification code resent',
      });
    } catch (err) {
      user.verificationToken = undefined;
      user.verificationTokenExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ success: false, message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
