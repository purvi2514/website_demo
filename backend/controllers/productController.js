const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");
const imageUtils = require("../utils/imageUrl");
const { sendSuccess, sendError, ERRORS, AppError } = require("../utils/errorHandler");

if (typeof imageUtils.transformProduct !== "function") {
  console.error("[imageUrl] transformProduct is not a function; using fallback");
  imageUtils.transformProduct = function(prod, req) {
    if (!prod) return null;
    const p = prod.toObject ? prod.toObject() : prod;
    return { _id: p._id, name: p.name, slug: p.slug, price: p.price, images: p.images || [] };
  };
}

// Simple slugify helper
function slugify(str) {
  return str.toString().toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureUniqueSlug(base) {
  let slug = slugify(base);
  let exists = await Product.findOne({ slug });
  if (!exists) return slug;
  const suffix = Date.now().toString().slice(-4);
  return `${slug}-${suffix}`;
}

// ✅ Create product
const createProduct = async (req, res, next) => {
  try {
    const { name, price, images, bestSeller } = req.body;

    // Validation
    if (!name || price === undefined) {
      return sendError(
        res,
        ERRORS.MISSING_REQUIRED_FIELDS.message,
        ERRORS.MISSING_REQUIRED_FIELDS.statusCode,
        ERRORS.MISSING_REQUIRED_FIELDS.code,
        { required: ["name", "price"] }
      );
    }

    if (isNaN(price) || price < 0) {
      return sendError(
        res,
        "Invalid price value",
        400,
        "PRODUCT_INVALID_PRICE"
      );
    }

    const slug = await ensureUniqueSlug(name);

    const product = new Product({
      name,
      price,
      images: images || [],
      bestSeller: bestSeller || false,
      slug
    });

    await product.save();
    console.info('[PRODUCT_CREATE] New product created:', name, 'ID:', product._id);

    return sendSuccess(
      res,
      imageUtils.transformProduct(product, req),
      "Product created successfully",
      201
    );
  } catch (err) {
    next(err);
  }
};

// ✅ Get product by ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Product ID is required",
        400,
        "PRODUCT_ID_REQUIRED"
      );
    }

    const product = await Product.findById(id).populate("category");
    if (!product) {
      return sendError(
        res,
        ERRORS.PRODUCT_NOT_FOUND.message,
        ERRORS.PRODUCT_NOT_FOUND.statusCode,
        ERRORS.PRODUCT_NOT_FOUND.code
      );
    }

    return sendSuccess(res, imageUtils.transformProduct(product, req), "Product retrieved successfully");
  } catch (err) {
    next(err);
  }
};

// ✅ Get product by slug
const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return sendError(
        res,
        "Product slug is required",
        400,
        "PRODUCT_SLUG_REQUIRED"
      );
    }

    const product = await Product.findOne({ slug }).populate("category");
    if (!product) {
      return sendError(
        res,
        ERRORS.PRODUCT_NOT_FOUND.message,
        ERRORS.PRODUCT_NOT_FOUND.statusCode,
        ERRORS.PRODUCT_NOT_FOUND.code
      );
    }

    return sendSuccess(res, imageUtils.transformProduct(product, req), "Product retrieved successfully");
  } catch (err) {
    next(err);
  }
};

// ✅ List products with filters
const listProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("category");
    
    return sendSuccess(
      res,
      {
        count: products.length,
        products: products.map(p => imageUtils.transformProduct(p, req))
      },
      "Products retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// ✅ Public search
const searchProducts = async (req, res, next) => {
  try {
    const q = req.query.q || "";

    if (!q.trim()) {
      return sendError(
        res,
        "Search query is required",
        400,
        "SEARCH_QUERY_REQUIRED"
      );
    }

    const products = await Product.find({ name: new RegExp(q, "i") }).populate("category");
    
    return sendSuccess(
      res,
      {
        query: q,
        count: products.length,
        products: products.map(p => imageUtils.transformProduct(p, req))
      },
      "Search completed successfully"
    );
  } catch (err) {
    next(err);
  }
};

// ✅ List best sellers
const listBestSellers = async (req, res, next) => {
  try {
    const products = await Product.find({ bestSeller: true }).populate("category");
    
    return sendSuccess(
      res,
      {
        count: products.length,
        products: products.map(p => imageUtils.transformProduct(p, req))
      },
      "Best sellers retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// ✅ Update product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Product ID is required",
        400,
        "PRODUCT_ID_REQUIRED"
      );
    }

    if (req.body.price !== undefined) {
      if (isNaN(req.body.price) || req.body.price < 0) {
        return sendError(
          res,
          "Invalid price value",
          400,
          "PRODUCT_INVALID_PRICE"
        );
      }
    }

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true }).populate("category");
    if (!product) {
      return sendError(
        res,
        ERRORS.PRODUCT_NOT_FOUND.message,
        ERRORS.PRODUCT_NOT_FOUND.statusCode,
        ERRORS.PRODUCT_NOT_FOUND.code
      );
    }

    console.info('[PRODUCT_UPDATE] Product updated:', id);

    return sendSuccess(
      res,
      imageUtils.transformProduct(product, req),
      "Product updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

// ✅ Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Product ID is required",
        400,
        "PRODUCT_ID_REQUIRED"
      );
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return sendError(
        res,
        ERRORS.PRODUCT_NOT_FOUND.message,
        ERRORS.PRODUCT_NOT_FOUND.statusCode,
        ERRORS.PRODUCT_NOT_FOUND.code
      );
    }

    console.info('[PRODUCT_DELETE] Product deleted:', id);

    return sendSuccess(
      res,
      { id: product._id },
      "Product deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

// ✅ Upload product image (supports multipart file or base64)
const uploadProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    // If multipart file uploaded
    if (req.file && req.file.filename) {
      const imagePath = `/uploads/${req.file.filename}`;

      let product;
      if (id === "temp") {
        product = { images: [imagePath] };
      } else {
        product = await Product.findByIdAndUpdate(id, { $push: { images: imagePath } }, { new: true }).populate("category");
        if (!product) {
          return sendError(res, ERRORS.PRODUCT_NOT_FOUND.message, ERRORS.PRODUCT_NOT_FOUND.statusCode, ERRORS.PRODUCT_NOT_FOUND.code);
        }
      }

      console.info('[PRODUCT_IMAGE_UPLOAD] Image file uploaded for product:', id);
      return sendSuccess(res, { imagePath, product: imageUtils.transformProduct(product, req) }, 'Image uploaded successfully', 201);
    }

    // Fallback: support base64 in body
    const base64 = req.body.image;
    if (!base64) {
      return sendError(res, 'Image data is required', 400, 'PRODUCT_IMAGE_REQUIRED');
    }

    try {
      const filename = `${Date.now()}.png`;
      const filepath = path.join(__dirname, "..", "uploads", filename);
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync(filepath, base64Data, "base64");

      const imagePath = `/uploads/${filename}`;

      let product;
      if (id === "temp") {
        product = { images: [imagePath] }; // dummy response for new product
      } else {
        product = await Product.findByIdAndUpdate(
          id,
          { $push: { images: imagePath } },
          { new: true }
        ).populate("category");
        
        if (!product) {
          return sendError(
            res,
            ERRORS.PRODUCT_NOT_FOUND.message,
            ERRORS.PRODUCT_NOT_FOUND.statusCode,
            ERRORS.PRODUCT_NOT_FOUND.code
          );
        }
      }

      console.info('[PRODUCT_IMAGE_UPLOAD] Image uploaded for product (base64):', id);

      return sendSuccess(
        res,
        { imagePath, product: imageUtils.transformProduct(product, req) },
        "Image uploaded successfully",
        201
      );
    } catch (fileErr) {
      console.error('[PRODUCT_IMAGE_UPLOAD] File write error:', fileErr);
      return sendError(res, ERRORS.FILE_UPLOAD_FAILED.message, ERRORS.FILE_UPLOAD_FAILED.statusCode, ERRORS.FILE_UPLOAD_FAILED.code);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProductById,
  getProductBySlug,
  listProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
  listBestSellers,
  uploadProductImage
};
