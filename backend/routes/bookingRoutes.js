const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/bookingController');

router.route('/').post(createBooking);
router.route('/user/:userId').get(getUserBookings);
router.route('/:id').put(updateBookingStatus).delete(deleteBooking);

module.exports = router;
