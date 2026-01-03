const SubCategory = require('../models/SubCategory');
const { sendSuccess, sendError, ERRORS } = require('../utils/errorHandler');

exports.createSubCategory = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) return sendError(res, ERRORS.MISSING_REQUIRED_FIELDS.message, 400, ERRORS.MISSING_REQUIRED_FIELDS.code, { required: ['name', 'category'] });
    const sub = new SubCategory(req.body);
    await sub.save();
    return sendSuccess(res, sub, 'Subcategory created', 201);
  } catch (err) { next(err); }
};

exports.listSubCategories = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const subs = await SubCategory.find(filter).sort({ name: 1 });
    return sendSuccess(res, { count: subs.length, subcategories: subs });
  } catch (err) { next(err); }
};

exports.getSubCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sub = await SubCategory.findById(id);
    if (!sub) return sendError(res, ERRORS.CATEGORY_NOT_FOUND.message, ERRORS.CATEGORY_NOT_FOUND.statusCode, ERRORS.CATEGORY_NOT_FOUND.code);
    return sendSuccess(res, sub);
  } catch (err) { next(err); }
};

exports.updateSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sub = await SubCategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!sub) return sendError(res, ERRORS.CATEGORY_NOT_FOUND.message, ERRORS.CATEGORY_NOT_FOUND.statusCode, ERRORS.CATEGORY_NOT_FOUND.code);
    return sendSuccess(res, sub, 'Subcategory updated');
  } catch (err) { next(err); }
};

exports.deleteSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sub = await SubCategory.findByIdAndDelete(id);
    if (!sub) return sendError(res, ERRORS.CATEGORY_NOT_FOUND.message, ERRORS.CATEGORY_NOT_FOUND.statusCode, ERRORS.CATEGORY_NOT_FOUND.code);
    return sendSuccess(res, { id: sub._id }, 'Subcategory deleted');
  } catch (err) { next(err); }
};