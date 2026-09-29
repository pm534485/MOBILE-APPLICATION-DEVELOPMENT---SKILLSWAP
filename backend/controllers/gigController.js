const Gig = require('../models/Gig');
const User = require('../models/User');

// @desc    Get all gigs
// @route   GET /api/gigs
// @access  Public
const getGigs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const gigs = await Gig.find(query).populate('owner', '-password').sort({ createdAt: -1 });
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single gig by ID
// @route   GET /api/gigs/:id
// @access  Public
const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('owner', '-password');
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.status(200).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new gig
// @route   POST /api/gigs
// @access  Public
const createGig = async (req, res) => {
  try {
    const { title, category, description, price, deliveryTime, owner } = req.body;

    if (!title || !category || !description || !price || !deliveryTime) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    let ownerId = null;
    if (owner && typeof owner === 'object' && owner._id) {
      ownerId = owner._id;
    } else if (typeof owner === 'string') {
      ownerId = owner;
    } else {
      // Find or assign first user
      const defaultOwner = await User.findOne();
      if (defaultOwner) ownerId = defaultOwner._id;
    }

    const newGig = await Gig.create({
      title,
      category,
      description,
      price: Number(price),
      deliveryTime,
      owner: ownerId,
      status: 'available',
      rating: 5.0,
      reviewsCount: 1,
      features: [
        'Direct campus communication',
        'Student-friendly revisions',
        'High-quality deliverable',
      ],
    });

    const populated = await Gig.findById(newGig._id).populate('owner', '-password');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update gig
// @route   PUT /api/gigs/:id
// @access  Public
const updateGig = async (req, res) => {
  try {
    const updated = await Gig.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('owner', '-password');

    if (!updated) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete gig
// @route   DELETE /api/gigs/:id
// @access  Public
const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findByIdAndDelete(req.params.id);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGigs,
  getGigById,
  createGig,
  updateGig,
  deleteGig,
};
