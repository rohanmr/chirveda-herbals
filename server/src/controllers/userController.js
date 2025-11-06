// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const sendEmail = require("../utils/sendEmail"); // your email util
const { User } = require("../models");

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// =====================
// REGISTER
// =====================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// =====================
// LOGIN
// =====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ error: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// =====================
// REQUEST PASSWORD RESET
// =====================
exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await user.update({ resetToken: token, resetTokenExpiry: expiry });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send email
    await sendEmail(
      email,
      "Password Reset Request",
      `<p>Click below to reset your password (valid 1 hour):</p>
       <a href="${resetLink}">${resetLink}</a>`
    );

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error("Request Reset Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// =====================
// RESET PASSWORD
// =====================
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: new Date() }, // not expired
      },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
