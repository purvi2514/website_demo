const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendSuccess, sendError, ERRORS, AppError } = require("../utils/errorHandler");

// -------------------- Admin Signup --------------------
const adminSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return sendError(
        res,
        ERRORS.MISSING_REQUIRED_FIELDS.message,
        ERRORS.MISSING_REQUIRED_FIELDS.statusCode,
        ERRORS.MISSING_REQUIRED_FIELDS.code,
        { required: ["name", "email", "password"] }
      );
    }

    if (password.length < 6) {
      return sendError(
        res,
        ERRORS.WEAK_PASSWORD.message,
        ERRORS.WEAK_PASSWORD.statusCode,
        ERRORS.WEAK_PASSWORD.code
      );
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return sendError(
        res,
        ERRORS.ADMIN_ALREADY_EXISTS.message,
        ERRORS.ADMIN_ALREADY_EXISTS.statusCode,
        ERRORS.ADMIN_ALREADY_EXISTS.code
      );
    }

    // Create admin user; password will be hashed by User pre-save hook
    const admin = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      role: "admin",
      otpVerified: true,
    });
    await admin.save();

    return sendSuccess(
      res,
      { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      "Admin created successfully",
      201
    );
  } catch (err) {
    next(err);
  }
};

// -------------------- Admin Login --------------------
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    // Validation
    if (!email || !password) {
      return sendError(
        res,
        ERRORS.MISSING_REQUIRED_FIELDS.message,
        ERRORS.MISSING_REQUIRED_FIELDS.statusCode,
        ERRORS.MISSING_REQUIRED_FIELDS.code,
        { required: ["email", "password"] }
      );
    }

    console.info('[ADMIN_LOGIN] Attempt from', req.ip, 'email:', email);

    // Find by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.warn('[ADMIN_LOGIN] User not found:', email);
      return sendError(
        res,
        ERRORS.INVALID_CREDENTIALS.message,
        ERRORS.INVALID_CREDENTIALS.statusCode,
        ERRORS.INVALID_CREDENTIALS.code
      );
    }

    // Ensure role is admin
    if (user.role !== 'admin') {
      console.warn('[ADMIN_LOGIN] Non-admin user attempted admin login:', email, 'role:', user.role);
      return sendError(
        res,
        ERRORS.FORBIDDEN.message,
        ERRORS.FORBIDDEN.statusCode,
        ERRORS.FORBIDDEN.code
      );
    }

    // Password verification
    let match = false;
    try {
      match = await user.comparePassword(password);
    } catch (err) {
      console.error('[ADMIN_LOGIN] Password comparison error:', err.message);
      return sendError(
        res,
        ERRORS.INTERNAL_SERVER_ERROR.message,
        ERRORS.INTERNAL_SERVER_ERROR.statusCode,
        ERRORS.INTERNAL_SERVER_ERROR.code
      );
    }

    if (!match) {
      console.warn('[ADMIN_LOGIN] Invalid password for:', email);
      return sendError(
        res,
        ERRORS.INVALID_CREDENTIALS.message,
        ERRORS.INVALID_CREDENTIALS.statusCode,
        ERRORS.INVALID_CREDENTIALS.code
      );
    }

    // JWT Secret check
    if (!process.env.JWT_SECRET) {
      console.error('[ADMIN_LOGIN] JWT_SECRET not configured');
      return sendError(
        res,
        "Server misconfiguration",
        500,
        "SERVER_MISCONFIGURED"
      );
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store token with user
    user.tokens = user.tokens || [];
    user.tokens.push({ token, createdAt: new Date() });
    user.lastLoginAt = new Date();
    await user.save();

    console.info('[ADMIN_LOGIN] Successful for:', email);

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Admin login successful"
    );
  } catch (err) {
    next(err);
  }
};

// Logout - remove current token from user's tokens
const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return sendError(
        res,
        "No token provided",
        400,
        "AUTH_NO_TOKEN"
      );
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) {
      return sendError(
        res,
        ERRORS.USER_NOT_FOUND.message,
        ERRORS.USER_NOT_FOUND.statusCode,
        ERRORS.USER_NOT_FOUND.code
      );
    }

    user.tokens = (user.tokens || []).filter(t => t.token !== token);
    await user.save();

    return sendSuccess(res, null, "Logged out successfully");
  } catch (err) {
    next(err);
  }
};

// -------------------- User Signup --------------------
const userSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return sendError(
        res,
        ERRORS.MISSING_REQUIRED_FIELDS.message,
        ERRORS.MISSING_REQUIRED_FIELDS.statusCode,
        ERRORS.MISSING_REQUIRED_FIELDS.code,
        { required: ["name", "email", "password"] }
      );
    }

    if (password.length < 6) {
      return sendError(
        res,
        ERRORS.WEAK_PASSWORD.message,
        ERRORS.WEAK_PASSWORD.statusCode,
        ERRORS.WEAK_PASSWORD.code
      );
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return sendError(
        res,
        ERRORS.USER_ALREADY_EXISTS.message,
        ERRORS.USER_ALREADY_EXISTS.statusCode,
        ERRORS.USER_ALREADY_EXISTS.code
      );
    }

    // Create regular user; password will be hashed by User pre-save hook
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      role: "user",
      otpVerified: true,
    });
    await user.save();

    console.info('[USER_SIGNUP] New user registered:', email);

    return sendSuccess(
      res,
      { id: user._id, name: user.name, email: user.email, role: user.role },
      "User created successfully",
      201
    );
  } catch (err) {
    next(err);
  }
};

// -------------------- User Login --------------------
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return sendError(
        res,
        ERRORS.MISSING_REQUIRED_FIELDS.message,
        ERRORS.MISSING_REQUIRED_FIELDS.statusCode,
        ERRORS.MISSING_REQUIRED_FIELDS.code,
        { required: ["email", "password"] }
      );
    }

    console.info('[USER_LOGIN] Attempt from', req.ip, 'email:', email);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.warn('[USER_LOGIN] User not found:', email);
      return sendError(
        res,
        ERRORS.INVALID_CREDENTIALS.message,
        ERRORS.INVALID_CREDENTIALS.statusCode,
        ERRORS.INVALID_CREDENTIALS.code
      );
    }

    const match = await user.comparePassword(password);
    if (!match) {
      console.warn('[USER_LOGIN] Invalid password for:', email);
      return sendError(
        res,
        ERRORS.INVALID_CREDENTIALS.message,
        ERRORS.INVALID_CREDENTIALS.statusCode,
        ERRORS.INVALID_CREDENTIALS.code
      );
    }

    // JWT Secret check
    if (!process.env.JWT_SECRET) {
      console.error('[USER_LOGIN] JWT_SECRET not configured');
      return sendError(
        res,
        "Server misconfiguration",
        500,
        "SERVER_MISCONFIGURED"
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.tokens = user.tokens || [];
    user.tokens.push({ token, createdAt: new Date() });
    user.lastLoginAt = new Date();
    await user.save();

    console.info('[USER_LOGIN] Successful for:', email);

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Login successful"
    );
  } catch (err) {
    next(err);
  }
};

// -------------------- Exports --------------------
module.exports = { adminSignup, adminLogin, userSignup, login, logout };
