const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createSubCategory, listSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory } = require('../controllers/subCategoryController');

router.post('/', auth, createSubCategory);
router.get('/', listSubCategories);
router.get('/:id', getSubCategoryById);
router.put('/:id', auth, updateSubCategory);
router.delete('/:id', auth, deleteSubCategory);

module.exports = router;