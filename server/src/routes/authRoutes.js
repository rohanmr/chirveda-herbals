// const express = require("express");
// const { registerUser, loginUser, requestReset, resetPassword } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // Forgot password
// router.post("/forgot-password", requestReset);

// // Reset password
// router.post("/reset-password", resetPassword);

// module.exports = router;


// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  requestReset,
  resetPassword,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.post("/request-reset", requestReset);
router.post("/reset-password", resetPassword);

module.exports = router;

