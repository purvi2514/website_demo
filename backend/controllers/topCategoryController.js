const TopCategory = require("../models/TopCategory");

// Create category
exports.createTopCategory = async (req, res) => {
  const cat = new TopCategory(req.body);
  await cat.save();
  res.json(cat);
};

// Update category
exports.updateTopCategory = async (req, res) => {
  const updated = await TopCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete category
exports.deleteTopCategory = async (req, res) => {
  await TopCategory.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// Add subProduct
exports.addSubProduct = async (req, res) => {
  const cat = await TopCategory.findById(req.params.id);
  cat.subProducts.push(req.body);
  await cat.save();
  res.json(cat);
};

// Update subProduct
exports.updateSubProduct = async (req, res) => {
  const cat = await TopCategory.findById(req.params.id);
  const sub = cat.subProducts.id(req.params.subId);
  Object.assign(sub, req.body);
  await cat.save();
  res.json(cat);
};

// Delete subProduct
exports.deleteSubProduct = async (req, res) => {
  const cat = await TopCategory.findById(req.params.id);
  cat.subProducts.id(req.params.subId).remove();
  await cat.save();
  res.json(cat);
};

// Get all categories
exports.getAllTopCategories = async (req, res) => {
  const all = await TopCategory.find();
  res.json(all);
};

// List top categories (route compatibility)
exports.listTopCategories = async (req, res) => {
  const all = await TopCategory.find();
  res.json(all);
};

// Get single top category by id
exports.getTopCategoryById = async (req, res) => {
  const cat = await TopCategory.findById(req.params.id);
  if (!cat) return res.status(404).json({ message: 'TopCategory not found' });
  res.json(cat);
};
