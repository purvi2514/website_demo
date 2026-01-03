const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { toggleWishlist, listWishlist } = require('../controllers/wishlistController');

// Toggle wishlist for a product (protected)
router.post('/:productId', auth, toggleWishlist);

// List wishlist (protected)
router.get('/', auth, listWishlist);

module.exports = router;
