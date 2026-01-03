const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const { sendSuccess, sendError, ERRORS } = require("../utils/errorHandler");

// Create category
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name) {
      return sendError(
        res,
        ERRORS.MISSING_REQUIRED_FIELDS.message,
        ERRORS.MISSING_REQUIRED_FIELDS.statusCode,
        ERRORS.MISSING_REQUIRED_FIELDS.code,
        { required: ["name"] }
      );
    }

    const category = new Category(req.body);
    await category.save();

    console.info('[CATEGORY_CREATE] New category created:', name);

    return sendSuccess(
      res,
      category,
      "Category created successfully",
      201
    );
  } catch (err) {
    next(err);
  }
};

// List categories
exports.listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    
    return sendSuccess(
      res,
      {
        count: categories.length,
        categories
      },
      "Categories retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// List categories with their subcategories (for navbar/menu)
exports.listCategoriesNav = async (req, res, next) => {
  try {
    const categories = await Category.find({ active: true }).sort({ name: 1 });

    const results = await Promise.all(
      categories.map(async (cat) => {
        const subs = await SubCategory.find({ category: cat._id, active: true }).sort({ name: 1 }).select('name slug');
        return {
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
          subcategories: subs,
        };
      })
    );

    return sendSuccess(res, { count: results.length, categories: results }, 'Categories for nav retrieved');
  } catch (err) {
    next(err);
  }
};

// Get by id
exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Category ID is required",
        400,
        "CATEGORY_ID_REQUIRED"
      );
    }

    const category = await Category.findById(id);
    if (!category) {
      return sendError(
        res,
        ERRORS.CATEGORY_NOT_FOUND.message,
        ERRORS.CATEGORY_NOT_FOUND.statusCode,
        ERRORS.CATEGORY_NOT_FOUND.code
      );
    }

    return sendSuccess(res, category, "Category retrieved successfully");
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Category ID is required",
        400,
        "CATEGORY_ID_REQUIRED"
      );
    }

    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) {
      return sendError(
        res,
        ERRORS.CATEGORY_NOT_FOUND.message,
        ERRORS.CATEGORY_NOT_FOUND.statusCode,
        ERRORS.CATEGORY_NOT_FOUND.code
      );
    }

    console.info('[CATEGORY_UPDATE] Category updated:', id);

    return sendSuccess(res, category, "Category updated successfully");
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Category ID is required",
        400,
        "CATEGORY_ID_REQUIRED"
      );
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return sendError(
        res,
        ERRORS.CATEGORY_NOT_FOUND.message,
        ERRORS.CATEGORY_NOT_FOUND.statusCode,
        ERRORS.CATEGORY_NOT_FOUND.code
      );
    }

    console.info('[CATEGORY_DELETE] Category deleted:', id);

    return sendSuccess(
      res,
      { id: category._id },
      "Category deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};

// ✅ List top categories
exports.listTopCategories = async (req, res, next) => {
  try {
    // Assuming you mark top categories with a boolean field `topCategory: true`
    const categories = await Category.find({ topCategory: true }).sort({ name: 1 });
    
    return sendSuccess(
      res,
      {
        count: categories.length,
        categories
      },
      "Top categories retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};
