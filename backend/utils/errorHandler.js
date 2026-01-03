/**
 * Standardized Error Handler Utility
 * Provides consistent error response formatting across all API endpoints
 */

// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Success Response Format
const sendSuccess = (res, data = null, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

// Error Response Format
const sendError = (res, message = "Internal Server Error", statusCode = 500, code = null, details = null) => {
  const errorResponse = {
    success: false,
    error: {
      message,
      code: code || `ERROR_${statusCode}`,
      statusCode,
    },
    timestamp: new Date().toISOString(),
  };

  if (details) {
    errorResponse.error.details = details;
  }

  res.status(statusCode).json(errorResponse);
};

// Common Error Messages
const ERRORS = {
  // Auth Errors (400-499)
  INVALID_CREDENTIALS: {
    message: "Invalid email or password",
    statusCode: 401,
    code: "AUTH_INVALID_CREDENTIALS",
  },
  USER_NOT_FOUND: {
    message: "User not found",
    statusCode: 404,
    code: "AUTH_USER_NOT_FOUND",
  },
  USER_ALREADY_EXISTS: {
    message: "User with this email already exists",
    statusCode: 409,
    code: "AUTH_USER_EXISTS",
  },
  ADMIN_ALREADY_EXISTS: {
    message: "Admin with this email already exists",
    statusCode: 409,
    code: "AUTH_ADMIN_EXISTS",
  },
  UNAUTHORIZED: {
    message: "Unauthorized - Invalid or missing token",
    statusCode: 401,
    code: "AUTH_UNAUTHORIZED",
  },
  FORBIDDEN: {
    message: "Forbidden - You don't have permission to access this resource",
    statusCode: 403,
    code: "AUTH_FORBIDDEN",
  },
  TOKEN_EXPIRED: {
    message: "Token has expired",
    statusCode: 401,
    code: "AUTH_TOKEN_EXPIRED",
  },
  INVALID_TOKEN: {
    message: "Invalid token",
    statusCode: 401,
    code: "AUTH_INVALID_TOKEN",
  },
  MISSING_REQUIRED_FIELDS: {
    message: "Missing required fields",
    statusCode: 400,
    code: "VALIDATION_MISSING_FIELDS",
  },
  INVALID_EMAIL: {
    message: "Invalid email format",
    statusCode: 400,
    code: "VALIDATION_INVALID_EMAIL",
  },
  WEAK_PASSWORD: {
    message: "Password must be at least 6 characters long",
    statusCode: 400,
    code: "VALIDATION_WEAK_PASSWORD",
  },

  // Product Errors
  PRODUCT_NOT_FOUND: {
    message: "Product not found",
    statusCode: 404,
    code: "PRODUCT_NOT_FOUND",
  },
  INVALID_PRODUCT_DATA: {
    message: "Invalid product data",
    statusCode: 400,
    code: "PRODUCT_INVALID_DATA",
  },
  PRODUCT_ALREADY_EXISTS: {
    message: "Product with this name already exists",
    statusCode: 409,
    code: "PRODUCT_EXISTS",
  },

  // Category Errors
  CATEGORY_NOT_FOUND: {
    message: "Category not found",
    statusCode: 404,
    code: "CATEGORY_NOT_FOUND",
  },
  INVALID_CATEGORY_DATA: {
    message: "Invalid category data",
    statusCode: 400,
    code: "CATEGORY_INVALID_DATA",
  },
  CATEGORY_ALREADY_EXISTS: {
    message: "Category with this name already exists",
    statusCode: 409,
    code: "CATEGORY_EXISTS",
  },

  // Wishlist Errors
  WISHLIST_NOT_FOUND: {
    message: "Wishlist not found",
    statusCode: 404,
    code: "WISHLIST_NOT_FOUND",
  },

  // Banner Errors
  BANNER_NOT_FOUND: {
    message: "Banner not found",
    statusCode: 404,
    code: "BANNER_NOT_FOUND",
  },

  // File/Upload Errors
  FILE_UPLOAD_FAILED: {
    message: "File upload failed",
    statusCode: 400,
    code: "FILE_UPLOAD_FAILED",
  },
  INVALID_FILE_TYPE: {
    message: "Invalid file type",
    statusCode: 400,
    code: "FILE_INVALID_TYPE",
  },
  FILE_TOO_LARGE: {
    message: "File size exceeds maximum limit",
    statusCode: 413,
    code: "FILE_TOO_LARGE",
  },

  // Server Errors
  INTERNAL_SERVER_ERROR: {
    message: "Internal server error",
    statusCode: 500,
    code: "SERVER_ERROR",
  },
  DATABASE_ERROR: {
    message: "Database operation failed",
    statusCode: 500,
    code: "DATABASE_ERROR",
  },
  INVALID_JSON: {
    message: "Invalid JSON in request body",
    statusCode: 400,
    code: "VALIDATION_INVALID_JSON",
  },
  NOT_FOUND: {
    message: "Route not found",
    statusCode: 404,
    code: "ROUTE_NOT_FOUND",
  },
};

// Error handling middleware to be used in server.js
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.code || "UNKNOWN"} - ${err.message}`);
  console.error("Stack:", err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const details = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});
    return sendError(
      res,
      "Validation error",
      400,
      "VALIDATION_ERROR",
      details
    );
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    return sendError(
      res,
      "Invalid ID format",
      400,
      "INVALID_ID_FORMAT"
    );
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return sendError(
      res,
      `${field} already exists`,
      409,
      "DUPLICATE_FIELD"
    );
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return sendError(
      res,
      ERRORS.INVALID_TOKEN.message,
      ERRORS.INVALID_TOKEN.statusCode,
      ERRORS.INVALID_TOKEN.code
    );
  }

  if (err.name === "TokenExpiredError") {
    return sendError(
      res,
      ERRORS.TOKEN_EXPIRED.message,
      ERRORS.TOKEN_EXPIRED.statusCode,
      ERRORS.TOKEN_EXPIRED.code
    );
  }

  // Custom AppError
  if (err instanceof AppError) {
    return sendError(
      res,
      err.message,
      err.statusCode,
      err.code
    );
  }

  // Default error
  return sendError(
    res,
    ERRORS.INTERNAL_SERVER_ERROR.message,
    ERRORS.INTERNAL_SERVER_ERROR.statusCode,
    ERRORS.INTERNAL_SERVER_ERROR.code
  );
};

module.exports = {
  AppError,
  sendSuccess,
  sendError,
  ERRORS,
  errorHandler,
};
