import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't return password by default
  },
  avatar: {
    type: String,
    default: '',
  },
  headline: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  careerGoal: {
    type: String,
    default: '',
  },
  experienceLevel: {
    type: String,
    default: '',
  },
  currentStatus: {
    type: String,
    default: '',
  },
  targetCompanies: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  phone: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  portfolio: {
    type: String,
    default: '',
  },
  github: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  refreshToken: String,
}, {
  timestamps: true,
});

// Encrypt password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to check if entered password matches hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
