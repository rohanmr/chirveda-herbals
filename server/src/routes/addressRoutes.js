const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

// POST - Add new address
router.post("/", addressController.addAddress);

// GET - Get user addresses by email
router.get("/:email", addressController.getUserAddresses);

// PUT - Update address by ID
router.put("/:id", addressController.updateAddress);

// DELETE - Delete address by ID
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
