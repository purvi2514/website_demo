require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- DB Connection --------------------
mongoose.connect(process.env.MONGO_URI, {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  dbName: process.env.DB_NAME || 'tazweed',
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// -------------------- Security Middlewares --------------------
app.use(helmet());

// Request timing log
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Request timeout
const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT_MS, 10) || 10000;
app.use((req, res, next) => {
  req.setTimeout(REQUEST_TIMEOUT);
  res.setTimeout(REQUEST_TIMEOUT);
  next();
});

// Body parser limits (for base64 images etc.)
// Use a text parser for JSON so we can apply a tolerant fallback for malformed JSON
app.use(express.text({ type: 'application/json', limit: '10mb' }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Tolerant JSON parser: try strict JSON.parse first, then apply simple heuristics
app.use((req, res, next) => {
  const ct = req.headers['content-type'] || '';
  if (!ct.includes('application/json')) return next();
  const raw = (typeof req.body === 'string') ? req.body : '';
  if (!raw) return next();
  try {
    req.body = JSON.parse(raw);
    return next();
  } catch (err) {
    // heuristic fixes: remove leading/trailing single quotes, replace single quotes with double
    let s = raw.trim();
    if (s.startsWith("'") && s.endsWith("'")) s = s.slice(1, -1);
    // replace occurrences of single-quoted keys/values with double quotes (naive)
    s = s.replace(/'([^']*)'/g, '"$1"');
    // remove trailing commas before } or ]
    s = s.replace(/,\s*(}|\])/g, '$1');
    try {
      req.body = JSON.parse(s);
      return next();
    } catch (err2) {
      // leave original error to be handled by JSON error middleware
      return next(err);
    }
  }
});

// JSON parse error handler - return clearer message for malformed requests
app.use((err, req, res, next) => {
  // Broadly handle body parse / JSON syntax errors to return a friendly message
  if (err && (err.status === 400 || err.type === 'entity.parse.failed' || (err.message && /JSON|Unexpected|Expected property name/i.test(err.message)))) {
    console.warn('Invalid JSON/body received from', req.ip, '-', err.message);
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  next(err);
});

// ✅ Enable CORS for frontend. Allow origins via env or default to localhost:3000 and localhost:5000
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const allowedOrigins = (process.env.ALLOWED_ORIGINS && process.env.ALLOWED_ORIGINS.split(",")) || [FRONTEND_ORIGIN, "http://localhost:5000"];
app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server or curl requests with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error("CORS policy: origin not allowed"));
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per window (increased from 100)
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for public endpoints
    return req.path === "/" || req.path.includes("/bestsellers");
  }
});

// -------------------- Routes --------------------
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const bannerRoutes = require("./routes/banner");
const categoryRoutes = require("./routes/categories");
const bestsellersRoutes = require("./routes/bestsellers");
const topCategoriesRoutes = require("./routes/topcategories");
const wishlistRoutes = require("./routes/wishlist");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");

app.use("/api/auth", limiter, authRoutes);
app.use("/api/products", limiter, productRoutes);
app.use("/api/banner", limiter, bannerRoutes);
app.use("/api/categories", limiter, categoryRoutes);
app.use("/api/bestsellers", bestsellersRoutes); // public
app.use("/api/topcategories", limiter, topCategoriesRoutes);
app.use("/api/wishlist", limiter, wishlistRoutes);
app.use("/api/cart", limiter, cartRoutes);
app.use("/api/orders", limiter, ordersRoutes);
app.use("/api/admin", limiter, adminRoutes);

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root health check
app.get("/", (req, res) => res.send("Backend is running"));

// 404 for API
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err.message || err);
  const status = err.status || 500;
  const payload = { error: err.message || "Internal Server Error" };
  if (process.env.DEBUG_STACK === "true") payload.stack = err.stack;
  res.status(status).json(payload);
});

// -------------------- Start Server --------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
