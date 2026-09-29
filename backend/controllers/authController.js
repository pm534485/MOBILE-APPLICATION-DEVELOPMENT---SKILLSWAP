const User = require('../models/User');

// Helper to generate self-contained academic simulated JWT token
const generateSimulatedToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: 'student_peer',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  const header = Buffer.from(JSON.stringify({ alg: 'SIM256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');
  const sig = Buffer.from(`sim_sig_${user.email}_${Date.now()}`).toString('base64');
  return `${header}.${body}.${sig}`;
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, department } = req.body;

  if (!name || !email || !password || !department) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      department,
      avatar: name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      skills: ['Campus Peer'],
    });

    const token = generateSimulatedToken(user);
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        avatar: user.avatar,
        rating: user.rating,
        skills: user.skills,
        gigsCompleted: user.gigsCompleted,
        gigsPosted: user.gigsPosted,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      // For demonstrative academic ease, create on the fly if not found
      user = await User.create({
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        password,
        department: 'MCA Computer Applications',
        avatar: email.slice(0, 2).toUpperCase(),
        skills: ['React Native', 'Node.js', 'Campus Freelance'],
      });
    }

    const token = generateSimulatedToken(user);
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        avatar: user.avatar,
        rating: user.rating,
        skills: user.skills,
        gigsCompleted: user.gigsCompleted,
        gigsPosted: user.gigsPosted,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
