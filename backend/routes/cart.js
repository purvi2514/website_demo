const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

// 🛒 GET /api/cart - Get user's cart
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user.cart || []);
  } catch (err) {
    next(err);
  }
});

// 🛒 POST /api/cart - Add item to cart
// body: { productId, qty }
router.post("/", auth, async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty) return res.status(400).json({ message: "productId and qty required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check if item already in cart
    const existing = user.cart.find(ci => ci.product.toString() === productId.toString());
    if (existing) {
      existing.qty = existing.qty + parseInt(qty, 10);
    } else {
      user.cart.push({ product: productId, qty: parseInt(qty, 10) });
    }

    await user.save();
    await user.populate("cart.product");
    return res.status(200).json(user.cart);
  } catch (err) {
    next(err);
  }
});

// 🛒 PUT /api/cart/:id - Update cart item quantity (cart item _id)
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { qty } = req.body;
    if (qty === undefined) return res.status(400).json({ message: "qty required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cart.id(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    if (parseInt(qty, 10) <= 0) {
      // remove item
      item.remove();
    } else {
      item.qty = parseInt(qty, 10);
    }

    await user.save();
    await user.populate("cart.product");
    return res.json(user.cart);
  } catch (err) {
    next(err);
  }
});

// 🛒 DELETE /api/cart/:id - Remove item from cart (cart item _id)
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cart.id(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.remove();
    await user.save();
    await user.populate("cart.product");
    return res.json(user.cart);
  } catch (err) {
    next(err);
  }
});

// 🛒 DELETE /api/cart - Clear entire cart
router.delete("/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = [];
    await user.save();
    return res.json([]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
