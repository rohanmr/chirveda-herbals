// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Correct usage
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
