const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const {
  getDashboardStats,
  getProductsByCategory,
  getProductsTrend,
  getUsersTrend,
  getPriceDistribution,
  getStockStatus,
} = require('../controllers/adminController');

// All admin endpoints are protected (require authentication)

// Dashboard overview
router.get('/dashboard/stats', auth, isAdmin, getDashboardStats);

// Products by category (for pie/bar chart)
router.get('/products/by-category', auth, isAdmin, getProductsByCategory);

// Product creation trend (for line chart)
router.get('/products/trend', auth, isAdmin, getProductsTrend);

// User creation trend (for line chart)
router.get('/users/trend', auth, isAdmin, getUsersTrend);

// Price distribution (for histogram/bar)
router.get('/products/price-distribution', auth, isAdmin, getPriceDistribution);

// Stock status (inventory overview)
router.get('/products/stock-status', auth, isAdmin, getStockStatus);

module.exports = router;
