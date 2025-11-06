const express = require("express");
const router = express.Router();
const { createOrder, getOrdersByEmail } = require("../controllers/orderController");

router.post("/", createOrder);          // Create order
router.get("/", getOrdersByEmail);      // Fetch user orders

module.exports = router;
