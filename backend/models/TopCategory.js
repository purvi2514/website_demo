const mongoose = require('mongoose');

const SubProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    type: { type: String, default: '' },
    active: { type: Boolean, default: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

const TopCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    count: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    img: { type: String, default: '' },
    subProducts: { type: [SubProductSchema], default: [] },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TopCategory', TopCategorySchema);
