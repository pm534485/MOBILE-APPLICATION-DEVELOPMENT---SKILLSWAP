const User = require('../models/User');

// @desc    Get all user profiles
// @route   GET /api/profiles
// @access  Public
const getProfiles = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single user profile
// @route   GET /api/profiles/:id
// @access  Public
const getProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/profiles/:id
// @access  Public
const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updated) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfiles,
  getProfileById,
  updateProfile,
};
