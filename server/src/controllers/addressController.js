// controllers/addressController.js
const Address = require("../models/Address");

// ✅ Add a new address
exports.addAddress = async (req, res) => {
  try {
    const { fullName, contactNumber, addressLine, city, state, pincode, userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    // Upsert (create if not exists, update if exists)
    const [address, created] = await Address.upsert({
      userEmail,
      fullName,
      contactNumber,
      addressLine,
      city,
      state,
      pincode,
    });

    res.status(200).json({ success: true, address });
  } catch (err) {
    console.error("Add Address Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get all addresses for a user
exports.getUserAddresses = async (req, res) => {
  try {
    const { email } = req.params;
    const addresses = await Address.findAll({ where: { userEmail: email } });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};

// ✅ Update an address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, contactNumber, addressLine, city, state, pincode } = req.body;

    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.update({ fullName, contactNumber, addressLine, city, state, pincode });
    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

// ✅ Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.destroy();
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Failed to delete address" });
  }
};
