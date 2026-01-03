const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const errorHandler = require("../utils/errorHandler");

// 🛒 GET /api/cart - Get user's cart
router.get("/", auth, async (req, res, next) => {
  try {
    // Since we don't have a Cart model, return empty array
    // In a real app, you'd query a Cart collection
    res.json([]);
  } catch (err) {
    next(errorHandler(err));
  }
});

// 🛒 POST /api/cart - Add item to cart
router.post("/", auth, async (req, res, next) => {
  try {
    const { item, qty } = req.body;
    if (!item || !qty) {
      return res.status(400).json({ message: "Item and quantity required" });
    }
    // In a real app, you'd save to Cart collection
    res.json([]);
  } catch (err) {
    next(errorHandler(err));
  }
});

// 🛒 PUT /api/cart/:id - Update cart item quantity
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { qty } = req.body;
    if (qty === undefined) {
      return res.status(400).json({ message: "Quantity required" });
    }
    // In a real app, you'd update the Cart collection
    res.json([]);
  } catch (err) {
    next(errorHandler(err));
  }
});

// 🛒 DELETE /api/cart/:id - Remove item from cart
router.delete("/:id", auth, async (req, res, next) => {
  try {
    // In a real app, you'd delete from Cart collection
    res.json([]);
  } catch (err) {
    next(errorHandler(err));
  }
});

// 🛒 DELETE /api/cart - Clear entire cart
router.delete("/", auth, async (req, res, next) => {
  try {
    // In a real app, you'd clear the user's cart
    res.json([]);
  } catch (err) {
    next(errorHandler(err));
  }
});

module.exports = router;
