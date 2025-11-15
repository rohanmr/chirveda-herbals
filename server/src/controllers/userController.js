// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const sendEmail = require("../utils/sendEmail");
const { User } = require("../models");
const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";
const FRONTEND_SECRET = "CHIRVEDA_SECRET_KEY_2025";

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const bytes = CryptoJS.AES.decrypt(password, FRONTEND_SECRET);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    console.log("Encrypted From FE:", password);
    console.log("Decrypted:", originalPassword);
    console.log("DB Hash:", user.password);

    const hashedPassword = await bcrypt.hash(originalPassword, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

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

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const bytes = CryptoJS.AES.decrypt(password, FRONTEND_SECRET);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    const match = await bcrypt.compare(originalPassword, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

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

// REQUEST RESET LINK
exports.requestReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000);

    await user.update({ resetToken: token, resetTokenExpiry: expiry });

    const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendEmail(
      email,
      "Password Reset",
      `Click to reset password: ${link}`
    );

    res.json({ message: "Reset link sent" });
  } catch (err) {
    console.error("Reset Request Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: new Date() },
      },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

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
