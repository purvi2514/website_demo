const express = require("express");
const router = express.Router();

// Import controllers
const {
  userSignup,
  adminSignup,
  adminLogin,
  login,
  logout,
} = require("../controllers/authController");

// -------------------- USER ROUTES --------------------

// Return JSON 405 for wrong method on these endpoints
router.all("/signup", (req, res, next) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST /api/auth/signup" });
  next();
});

router.all("/login", (req, res, next) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST /api/auth/login" });
  next();
});

// User signup/login
router.post("/signup", userSignup);
router.post("/login", login);

// Social logins (not implemented here)
// If you plan to add Google/Apple login handlers, implement them in the
// authController and add them to the import above.

// -------------------- ADMIN ROUTES --------------------

// Admin signup (only whitelisted emails)
router.post("/admin-signup", adminSignup);

// Note: single unified `/login` endpoint handles both users and admins

// Logout (protected by token)
router.post('/logout', logout);

module.exports = router;
