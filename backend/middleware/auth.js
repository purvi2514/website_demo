const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided. Please login first.' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token signature
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and verify token hasn't been revoked
    const user = await User.findById(payload.id).select('+tokens +role');
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    const hasToken = Array.isArray(user.tokens) && user.tokens.some(t => t.token === token);
    if (!hasToken) return res.status(401).json({ success: false, message: 'Token revoked or invalid' });

    req.user = { id: user._id.toString(), role: user.role };
    req._token = token;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};
