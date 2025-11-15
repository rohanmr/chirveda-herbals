const User = require("../models/User");
const Order = require("../models/Order");
const Address = require("../models/Address");
const Lead = require("../models/Lead");

exports.getAdminData = async (req, res) => {
  try {
    // Fetch users
    const users = await User.findAll({
      attributes: ["id", "name", "email", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    // Fetch orders with user email
    const orders = await Order.findAll({
      attributes: [
        "id",
        "orderId",
        "items",
        "totalAmount",
        "status",
        "paymentMethod",
        "paidAt",
        "date",
        "email",
      ],
      order: [["date", "DESC"]],
    });

    // Fetch addresses with user email
    const addresses = await Address.findAll({
      attributes: [
        "id",
        "fullName",
        "contactNumber",
        "addressLine",
        "city",
        "state",
        "pincode",
        "userEmail",
      ],
      order: [["createdAt", "DESC"]],
    });

    // Fetch leads
    const leads = await Lead.findAll({
      attributes: ["id", "email", "visitedAt"],
      order: [["visitedAt", "DESC"]],
    });

    return res.json({
      status: "success",
      data: {
        users,
        orders,
        addresses,
        leads,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};
