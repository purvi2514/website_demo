const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const auth = require('../middleware/auth');
const {
  createTopCategory,
  listTopCategories,
  getTopCategoryById,
  updateTopCategory,
  deleteTopCategory,
  addSubProduct,
  updateSubProduct,
  deleteSubProduct,
} = require('../controllers/topCategoryController');

// Top Categories CRUD
router.post('/', auth, createTopCategory);
router.get('/', listTopCategories);
router.get('/:id', getTopCategoryById);
router.put('/:id', auth, updateTopCategory);
router.delete('/:id', auth, deleteTopCategory);

// SubProducts CRUD
router.post('/:id/subproducts', auth, upload.single('image'), addSubProduct);
router.put('/:id/subproducts/:subId', auth, upload.single('image'), updateSubProduct);
router.delete('/:id/subproducts/:subId', auth, deleteSubProduct);

module.exports = router;
