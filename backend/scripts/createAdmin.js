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
  const password = parseArg('password');
  const name = parseArg('name') || 'Admin';

  if (!email || !password) {
    console.error('Usage: node scripts/createAdmin.js --email admin@example.com --password secret [--name "Admin Name"]');
    process.exit(1);
  }

  const mongo = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tazweed';
  await connectDB(mongo);

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.role === 'admin') {
        console.log('Admin with this email already exists.');
        process.exit(0);
      }
      console.error('A user with this email already exists and is not an admin. Aborting.');
      process.exit(1);
    }

    const admin = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin',
      otpVerified: true,
    });

    await admin.save();
    console.log('Admin created successfully:', admin.email);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message || err);
    process.exit(1);
  }
}

run();
