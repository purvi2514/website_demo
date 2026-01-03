const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },

    password: { type: String, required: true, minlength: 6 },

    // 🔹 role: user / seller / admin
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },


    // 🔹 wishlist: products saved by the user
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    // 🔹 cart: items added by the user
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        qty: { type: Number, required: true, min: 1, default: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],

    // 🔹 issued tokens (JWTs) - store for session management
    tokens: [
      {
        token: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // 🔹 last login timestamp
    lastLoginAt: { type: Date },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// 🔹 Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
