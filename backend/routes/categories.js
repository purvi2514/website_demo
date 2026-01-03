const express = require('express');
const router = express.Router();

const {
  createCategory,
  listCategories,
  listCategoriesNav,
  getCategoryById,
  updateCategory,
  deleteCategory,
  listTopCategories
} = require('../controllers/categoryController');

const auth = require('../middleware/auth');

/* ----------------------------
   📂 Category Routes
----------------------------- */

// 🔹 Create category (protected)
router.post('/', auth, createCategory);

// 🔹 List all categories
router.get('/', listCategories);

// 🔹 List categories + subcategories for navbar/menu
router.get('/nav', listCategoriesNav);

// 🔹 List top categories (public)
router.get('/topcategories', listTopCategories);

// 🔹 Get category by ID (dynamic route — keep after specific ones)
router.get('/:id', getCategoryById);

// 🔹 Update category (protected)
router.put('/:id', auth, updateCategory);

// 🔹 Delete category (protected)
router.delete('/:id', auth, deleteCategory);

module.exports = router;
