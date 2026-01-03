const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const {
  createBanner,
  listBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  uploadBannerImage,
} = require('../controllers/bannerController');

const auth = require('../middleware/auth');

// Create banner (protected). Accepts optional multipart image
router.post('/', auth, upload.single('image'), createBanner);
// Upload/replace image for existing banner
router.post('/:id/image', auth, upload.single('image'), uploadBannerImage);

// List banners (public)
router.get('/', listBanners);

// Get single banner
router.get('/:id', getBannerById);

// Update banner (protected)
router.put('/:id', auth, updateBanner);

// Delete banner (protected)
router.delete('/:id', auth, deleteBanner);

module.exports = router;
