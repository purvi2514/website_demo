const User = require('../models/User');
const Product = require('../models/Product');
const imageUtils = require('../utils/imageUrl');
const { sendSuccess, sendError, ERRORS } = require("../utils/errorHandler");

if (typeof imageUtils.transformProduct !== 'function') {
  console.error('[imageUrl] transformProduct is not a function; using fallback in wishlist');
  imageUtils.transformProduct = function(p, req) { if (!p) return null; const o = p.toObject ? p.toObject() : p; return { _id: o._id, name: o.name, price: o.price, images: o.images || [] }; };
}

// Toggle wishlist: add if not present, remove if present
exports.toggleWishlist = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return sendError(
        res,
        ERRORS.UNAUTHORIZED.message,
        ERRORS.UNAUTHORIZED.statusCode,
        ERRORS.UNAUTHORIZED.code
      );
    }



    const productId = req.params.productId;
    
    if (!productId) {
      return sendError(
        res,
        "Product ID is required",
        400,
        "PRODUCT_ID_REQUIRED"
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendError(
        res,
        ERRORS.USER_NOT_FOUND.message,
        ERRORS.USER_NOT_FOUND.statusCode,
        ERRORS.USER_NOT_FOUND.code
      );
    }

    const idx = user.wishlist.findIndex((p) => p.toString() === productId);
    let added = false;
    if (idx === -1) {
      // ensure product exists
      const prod = await Product.findById(productId);
      if (!prod) {
        return sendError(
          res,
          ERRORS.PRODUCT_NOT_FOUND.message,
          ERRORS.PRODUCT_NOT_FOUND.statusCode,
          ERRORS.PRODUCT_NOT_FOUND.code
        );
      }
      user.wishlist.push(productId);
      added = true;
    } else {
      user.wishlist.splice(idx, 1);
      added = false;
    }

    await user.save();
    console.info('[WISHLIST_TOGGLE]', added ? 'Added' : 'Removed', 'product:', productId, 'for user:', userId);

    return sendSuccess(
      res,
      {
        added,
        wishlistCount: user.wishlist.length,
        productId
      },
      added ? "Product added to wishlist" : "Product removed from wishlist"
    );
  } catch (err) {
    next(err);
  }
};

// List current user's wishlist (populated products)
exports.listWishlist = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return sendError(
        res,
        ERRORS.UNAUTHORIZED.message,
        ERRORS.UNAUTHORIZED.statusCode,
        ERRORS.UNAUTHORIZED.code
      );
    }

    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return sendError(
        res,
        ERRORS.USER_NOT_FOUND.message,
        ERRORS.USER_NOT_FOUND.statusCode,
        ERRORS.USER_NOT_FOUND.code
      );
    }

    const products = user.wishlist.map(p => imageUtils.transformProduct(p, req));
    console.info('[WISHLIST_LIST] Retrieved', products.length, 'items for user:', userId);

    return sendSuccess(
      res,
      {
        count: products.length,
        products
      },
      "Wishlist retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};
