import User from '../models/User.js';

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
