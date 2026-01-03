const express = require('express');
const router = express.Router();
const { listBestSellers } = require('../controllers/productController');

// Public endpoint for best sellers
router.get('/', listBestSellers);

module.exports = router;
