import Profile from '../models/Profile.js';
import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // If profile doesn't exist, create an empty one and hydrate from existing User data if any
    if (!profile) {
      const user = await User.findById(req.user.id);
      
      profile = new Profile({ user: req.user.id });
      
      if (user) {
        if (user.phone) profile.personalInfo.phone = user.phone;
        if (user.location) profile.personalInfo.city = user.location;
        if (user.headline) profile.professionalInfo.headline = user.headline;
        
        if (user.experienceLevel) {
          profile.professionalInfo.yearsOfExperience = user.experienceLevel === 'Entry Level' ? 0 : 
                                                       user.experienceLevel === 'Mid Level' ? 3 : 5;
        }
        if (user.currentStatus) profile.professionalInfo.employmentStatus = user.currentStatus;
        if (user.careerGoal) profile.careerGoals.careerGoal = user.careerGoal;
        if (user.targetCompanies && user.targetCompanies.length > 0) profile.careerGoals.targetCompanies = user.targetCompanies;
        
        if (user.skills && user.skills.length > 0) {
          profile.skills = user.skills.map(skill => ({ name: skill, category: 'Other' }));
        }
        
        if (user.github) profile.socialLinks.github = user.github;
        if (user.linkedin) profile.socialLinks.linkedin = user.linkedin;
        if (user.portfolio) profile.socialLinks.portfolio = user.portfolio;
      }
      
      await profile.save();
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PATCH /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    // List of allowed top-level keys to update
    const allowedUpdates = [
      'personalInfo',
      'professionalInfo',
      'careerGoals',
      'skills',
      'education',
      'experience',
      'projects',
      'socialLinks',
      'preferences'
    ];

    // Loop through the request body and update the profile fields
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        // Use object assignment to merge, not overwrite
        if (typeof req.body[key] === 'object' && req.body[key] !== null && !Array.isArray(req.body[key])) {
          profile[key] = { ...profile[key]?.toObject?.() || profile[key], ...req.body[key] };
          profile.markModified(key);
        } else {
          profile[key] = req.body[key];
        }
      }
    });

    // Recalculate completion percentage (simple version for now)
    let completedFields = 0;
    let totalFields = 9; // Number of major sections

    if (profile.personalInfo && profile.personalInfo.phone) completedFields++;
    if (profile.professionalInfo && profile.professionalInfo.headline) completedFields++;
    if (profile.careerGoals && profile.careerGoals.careerGoal) completedFields++;
    if (profile.skills && profile.skills.length > 0) completedFields++;
    if (profile.education && profile.education.length > 0) completedFields++;
    if (profile.experience && profile.experience.length > 0) completedFields++;
    if (profile.projects && profile.projects.length > 0) completedFields++;
    if (profile.socialLinks && Object.values(profile.socialLinks).some(val => val !== '')) completedFields++;
    if (profile.avatar) completedFields++;

    profile.completionPercentage = Math.round((completedFields / totalFields) * 100);

    await profile.save();

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Upload avatar
// @route   PATCH /api/profile/avatar
// @access  Private
export const uploadAvatar = async (req, res) => {
  try {
    // Expecting req.body.avatarUrl from frontend (Cloudinary upload should ideally happen on client or via a separate upload route)
    // For now, we'll assume the client uploads to Cloudinary and sends the URL
    const { avatarUrl } = req.body;

    if (!avatarUrl) {
      return res.status(400).json({ success: false, message: 'Please provide an avatar URL' });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { avatar: avatarUrl },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
