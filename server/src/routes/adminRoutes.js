const express = require("express");
const router = express.Router();
const { getAdminData } = require("../controllers/adminController");

// GET /admin-page
router.get("/admin-page", getAdminData);

module.exports = router;
