const Product = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');
const { sendSuccess, sendError, ERRORS } = require("../utils/errorHandler");

// Get dashboard overview stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Products stats
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ active: true });
    const inactiveProducts = await Product.countDocuments({ active: false });
    const bestSellers = await Product.countDocuments({ bestSeller: true });

    // Categories stats
    const totalCategories = await Category.countDocuments();

    // Users stats
    const totalUsers = await User.countDocuments();

    const stats = {
      products: {
        total: totalProducts,
        active: activeProducts,
        inactive: inactiveProducts,
        bestSellers: bestSellers,
      },
      categories: {
        total: totalCategories,
      },
      users: {
        total: totalUsers,
      },
    };

    console.info('[ADMIN_DASHBOARD] Stats retrieved');

    return sendSuccess(res, stats, "Dashboard stats retrieved successfully");
  } catch (err) {
    next(err);
  }
};

// Get product statistics by category
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const data = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          activeCount: {
            $sum: { $cond: [{ $eq: ['$active', true] }, 1, 0] },
          },
        },
      },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
    ]);

    console.info('[ADMIN_PRODUCTS_BY_CATEGORY] Retrieved', data.length, 'categories');

    return sendSuccess(
      res,
      {
        count: data.length,
        data
      },
      "Products by category retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get product creation trend (by date range, default last 30 days)
exports.getProductsTrend = async (req, res, next) => {
  try {
    const days = Math.max(parseInt(req.query.days, 10) || 30, 1);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trend = await Product.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.info('[ADMIN_PRODUCTS_TREND] Retrieved', days, 'day trend');

    return sendSuccess(
      res,
      {
        days,
        data: trend,
        count: trend.length
      },
      "Products trend retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get user creation trend (by date range, default last 30 days)
exports.getUsersTrend = async (req, res, next) => {
  try {
    const days = Math.max(parseInt(req.query.days, 10) || 30, 1);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trend = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.info('[ADMIN_USERS_TREND] Retrieved', days, 'day trend');

    return sendSuccess(
      res,
      {
        days,
        data: trend,
        count: trend.length
      },
      "Users trend retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get price distribution (products by price range)
exports.getPriceDistribution = async (req, res, next) => {
  try {
    const distribution = await Product.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $lt: ['$price', 1000] },
              '0-1000',
              {
                $cond: [
                  { $lt: ['$price', 5000] },
                  '1000-5000',
                  {
                    $cond: [
                      { $lt: ['$price', 10000] },
                      '5000-10000',
                      '10000+',
                    ],
                  },
                ],
              },
            ],
          },
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    console.info('[ADMIN_PRICE_DISTRIBUTION] Retrieved', distribution.length, 'ranges');

    return sendSuccess(
      res,
      {
        distribution
      },
      "Price distribution retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get stock status (low stock, out of stock products)
exports.getStockStatus = async (req, res, next) => {
  try {
    const lowStockThreshold = Math.max(parseInt(req.query.threshold, 10) || 10, 0);

    const inStock = await Product.countDocuments({ stock: { $gt: lowStockThreshold } });
    const lowStock = await Product.countDocuments({
      stock: { $gt: 0, $lte: lowStockThreshold },
    });
    const outOfStock = await Product.countDocuments({ stock: { $eq: 0 } });

    const lowStockProducts = await Product.find(
      { stock: { $gt: 0, $lte: lowStockThreshold } },
      'name price stock'
    )
      .limit(10)
      .populate('category');

    console.info('[ADMIN_STOCK_STATUS] Retrieved stock status, threshold:', lowStockThreshold);

    return sendSuccess(
      res,
      {
        summary: {
          inStock,
          lowStock,
          outOfStock,
        },
        threshold: lowStockThreshold,
        lowStockProducts,
      },
      "Stock status retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};
