#!/usr/bin/env node
require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

function parseArg(name) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return null;
  return process.argv[idx + 1];
}

async function run() {
  const email = parseArg('email');
  if (!email) {
    console.error('Usage: node scripts/findUser.js --email user@example.com');
    process.exit(1);
  }

  const mongo = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tazweed';
  await connectDB(mongo);

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user) {
      console.log('User not found');
      process.exit(0);
    }
    // Print some important fields only
    const out = {
      id: user._id,
      email: user.email,
      role: user.role,
      otpVerified: user.otpVerified,
      passwordHash: user.password,
      createdAt: user.createdAt,
    };
    console.log(JSON.stringify(out, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

run();
