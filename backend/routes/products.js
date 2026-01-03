const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProductById,
  getProductBySlug,
  listProducts,
  updateProduct,
  deleteProduct,
  listBestSellers,
  uploadProductImage,
  searchProducts
} = require('../controllers/productController');

const auth = require('../middleware/auth');

/* ----------------------------
   📦 Product Routes
----------------------------- */

// 🔹 Create product (protected)
router.post('/', auth, createProduct);

// 🔹 List all products (filters + pagination)
router.get('/', listProducts);

// 🔹 Public search endpoint
router.get('/search', searchProducts);

// 🔹 List best sellers (public)
router.get('/bestsellers', listBestSellers);

// 🔹 Get product by slug (public)
router.get('/slug/:slug', getProductBySlug);

const upload = require('../utils/upload');
// 🔹 Upload product image (protected) - supports multipart file (field 'image') or base64 in body
router.post('/:id/images', auth, upload.single('image'), uploadProductImage);

// 🔹 Get product by ID (public)
router.get('/:id', getProductById);

// 🔹 Update product (protected)
router.put('/:id', auth, updateProduct);

// 🔹 Delete product (protected)
router.delete('/:id', auth, deleteProduct);

module.exports = router;
