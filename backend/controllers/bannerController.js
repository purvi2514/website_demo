const Banner = require('../models/Banner');
const { transformBanner } = require('../utils/imageUrl');
const { sendSuccess, sendError, ERRORS } = require("../utils/errorHandler");

// Create a banner (protected)
exports.createBanner = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return sendError(
        res,
        ERRORS.MISSING_REQUIRED_FIELDS.message,
        ERRORS.MISSING_REQUIRED_FIELDS.statusCode,
        ERRORS.MISSING_REQUIRED_FIELDS.code,
        { required: ["title"] }
      );
    }

    // If an image was uploaded via multipart, set the image path
    if (req.file && req.file.filename) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    const banner = new Banner(req.body);
    await banner.save();

    console.info('[BANNER_CREATE] New banner created:', title);

    return sendSuccess(res, banner, "Banner created successfully", 201);
  } catch (err) {
    next(err);
  }
};
+
+// Upload/replace banner image
+exports.uploadBannerImage = async (req, res, next) => {
+  try {
+    const { id } = req.params;
+    if (!id) return sendError(res, ERRORS.MISSING_REQUIRED_FIELDS.message, 400, 'BANNER_ID_REQUIRED');
+    if (!req.file || !req.file.filename) return sendError(res, 'No image uploaded', 400, 'NO_FILE');
+
+    const banner = await Banner.findByIdAndUpdate(id, { image: `/uploads/${req.file.filename}` }, { new: true });
+    if (!banner) return sendError(res, ERRORS.BANNER_NOT_FOUND.message, ERRORS.BANNER_NOT_FOUND.statusCode, ERRORS.BANNER_NOT_FOUND.code);
+
+    return sendSuccess(res, transformBanner(banner, req), 'Banner image updated');
+  } catch (err) {
+    next(err);
+  }
+};

// List banners (public). Optional query `active=true` to filter active banners
exports.listBanners = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.active === 'true') filter.active = true;
    const banners = await Banner.find(filter).sort({ order: 1, createdAt: -1 });

    return sendSuccess(
      res,
      {
        count: banners.length,
        banners: banners.map(b => transformBanner(b, req))
      },
      "Banners retrieved successfully"
    );
  } catch (err) {
    next(err);
  }
};

// Get banner by id
exports.getBannerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Banner ID is required",
        400,
        "BANNER_ID_REQUIRED"
      );
    }

    const banner = await Banner.findById(id);
    if (!banner) {
      return sendError(
        res,
        ERRORS.BANNER_NOT_FOUND.message,
        ERRORS.BANNER_NOT_FOUND.statusCode,
        ERRORS.BANNER_NOT_FOUND.code
      );
    }

    return sendSuccess(res, transformBanner(banner, req), "Banner retrieved successfully");
  } catch (err) {
    next(err);
  }
};

// Update banner (protected)
exports.updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Banner ID is required",
        400,
        "BANNER_ID_REQUIRED"
      );
    }

    const banner = await Banner.findByIdAndUpdate(id, req.body, { new: true });
    if (!banner) {
      return sendError(
        res,
        ERRORS.BANNER_NOT_FOUND.message,
        ERRORS.BANNER_NOT_FOUND.statusCode,
        ERRORS.BANNER_NOT_FOUND.code
      );
    }

    console.info('[BANNER_UPDATE] Banner updated:', id);

    return sendSuccess(res, banner, "Banner updated successfully");
  } catch (err) {
    next(err);
  }
};

// Delete banner (protected)
exports.deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendError(
        res,
        "Banner ID is required",
        400,
        "BANNER_ID_REQUIRED"
      );
    }

    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return sendError(
        res,
        ERRORS.BANNER_NOT_FOUND.message,
        ERRORS.BANNER_NOT_FOUND.statusCode,
        ERRORS.BANNER_NOT_FOUND.code
      );
    }

    console.info('[BANNER_DELETE] Banner deleted:', id);

    return sendSuccess(
      res,
      { id: banner._id },
      "Banner deleted successfully"
    );
  } catch (err) {
    next(err);
  }
};
