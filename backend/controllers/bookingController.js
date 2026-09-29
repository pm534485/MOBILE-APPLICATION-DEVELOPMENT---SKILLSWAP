const Booking = require('../models/Booking');
const Gig = require('../models/Gig');
const User = require('../models/User');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    let { gigId, userId, notes } = req.body;

    if (!gigId) {
      return res.status(400).json({ message: 'gigId is required' });
    }

    // Resolve userId if simulated
    let resolvedUserId = userId;
    if (!resolvedUserId || String(resolvedUserId).startsWith('u_')) {
      const defaultUser = await User.findOne();
      if (defaultUser) resolvedUserId = defaultUser._id;
    }

    // Resolve gigId if simulated
    let resolvedGigId = gigId;
    if (String(resolvedGigId).startsWith('g')) {
      const firstGig = await Gig.findOne();
      if (firstGig) resolvedGigId = firstGig._id;
    }

    const booking = await Booking.create({
      gig: resolvedGigId,
      user: resolvedUserId,
      status: 'active',
      notes: notes || 'Booked via SkillSwap Mobile',
    });

    const populated = await Booking.findById(booking._id)
      .populate({
        path: 'gig',
        populate: { path: 'owner', select: '-password' },
      })
      .populate('user', '-password');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookings for a specific user
// @route   GET /api/bookings/user/:userId
// @access  Public
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    let query = {};

    if (userId && !String(userId).startsWith('u_')) {
      query.user = userId;
    }

    const bookings = await Booking.find(query)
      .populate({
        path: 'gig',
        populate: { path: 'owner', select: '-password' },
      })
      .populate('user', '-password')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Public
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('gig')
      .populate('user', '-password');

    if (!updated) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Public
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
};
