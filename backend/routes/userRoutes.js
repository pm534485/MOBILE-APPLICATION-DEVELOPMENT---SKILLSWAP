const express = require('express');
const router = express.Router();
const {
  getProfiles,
  getProfileById,
  updateProfile,
} = require('../controllers/userController');

router.route('/').get(getProfiles);
router.route('/:id').get(getProfileById).put(updateProfile);

module.exports = router;
