import User from '../models/User.js';
import Profile from '../models/Profile.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.headline = req.body.headline !== undefined ? req.body.headline : user.headline;
      user.careerGoal = req.body.careerGoal !== undefined ? req.body.careerGoal : user.careerGoal;
      user.experienceLevel = req.body.experienceLevel !== undefined ? req.body.experienceLevel : user.experienceLevel;
      user.currentStatus = req.body.currentStatus !== undefined ? req.body.currentStatus : user.currentStatus;
      user.targetCompanies = req.body.targetCompanies || user.targetCompanies;
      user.skills = req.body.skills || user.skills;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.location = req.body.location !== undefined ? req.body.location : user.location;
      user.portfolio = req.body.portfolio !== undefined ? req.body.portfolio : user.portfolio;
      user.github = req.body.github !== undefined ? req.body.github : user.github;
      user.linkedin = req.body.linkedin !== undefined ? req.body.linkedin : user.linkedin;
      
      if (req.body.isOnboarded !== undefined) {
        user.isOnboarded = req.body.isOnboarded;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      // Sync with Profile model
      let profile = await Profile.findOne({ user: user._id });
      if (!profile) {
        profile = new Profile({ user: user._id });
      }

      // Map fields from User model to Profile model if they exist in req.body
      if (req.body.phone) profile.personalInfo.phone = req.body.phone;
      if (req.body.location) {
        // assuming location is city/state combo, just put in city for now
        profile.personalInfo.city = req.body.location;
      }
      
      if (req.body.headline) profile.professionalInfo.headline = req.body.headline;
      if (req.body.experienceLevel) {
        profile.professionalInfo.yearsOfExperience = req.body.experienceLevel === 'Entry Level' ? 0 : 
                                                     req.body.experienceLevel === 'Mid Level' ? 3 : 5;
      }
      if (req.body.currentStatus) profile.professionalInfo.employmentStatus = req.body.currentStatus;
      
      if (req.body.careerGoal) profile.careerGoals.careerGoal = req.body.careerGoal;
      if (req.body.targetCompanies) profile.careerGoals.targetCompanies = req.body.targetCompanies;
      
      if (req.body.skills) {
        // Just map basic string skills to name, without category for now
        profile.skills = req.body.skills.map(skill => ({ name: skill, category: 'Other' }));
      }
      
      if (req.body.github) profile.socialLinks.github = req.body.github;
      if (req.body.linkedin) profile.socialLinks.linkedin = req.body.linkedin;
      if (req.body.portfolio) profile.socialLinks.portfolio = req.body.portfolio;

      if (req.body.college && req.body.degree && req.body.graduationYear) {
        // Only push if education is empty to avoid duplicates on re-submits
        if (profile.education.length === 0) {
          profile.education.push({
            institution: req.body.college,
            degree: req.body.degree,
            endYear: req.body.graduationYear,
          });
        }
      }

      // Simple completion percentage calculation for onboarding fields
      profile.completionPercentage = 25; // Base 25% for onboarding
      await profile.save();

      res.status(200).json({
        success: true,
        user: updatedUser
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
