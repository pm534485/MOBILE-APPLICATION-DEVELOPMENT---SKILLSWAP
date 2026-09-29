const express = require('express');
const router = express.Router();
const {
  getGigs,
  getGigById,
  createGig,
  updateGig,
  deleteGig,
} = require('../controllers/gigController');

router.route('/').get(getGigs).post(createGig);
router.route('/:id').get(getGigById).put(updateGig).delete(deleteGig);

module.exports = router;
