const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["super-admin", "admin", "moderator", "editor"],
      default: "admin",
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String } // Adding verificationToken
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
