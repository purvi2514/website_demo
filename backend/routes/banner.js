const express = require('express');
const router = express.Router();
const {
  createBanner,
  listBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} = require('../controllers/bannerController');

const auth = require('../middleware/auth');

// Create banner (protected)
router.post('/', auth, createBanner);

// List banners (public)
router.get('/', listBanners);

// Get single banner
router.get('/:id', getBannerById);

// Update banner (protected)
router.put('/:id', auth, updateBanner);

// Delete banner (protected)
router.delete('/:id', auth, deleteBanner);

module.exports = router;
