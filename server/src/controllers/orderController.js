const Order = require("../models/Order"); // create an Order model similar to Lead
const sequelize = require("../config/db");

exports.createOrder = async (req, res) => {
  try {
    const { email, items, totalAmount } = req.body;

    if (!email || !items?.length) {
      return res.status(400).json({ message: "Email and items are required" });
    }

    const order = await Order.create({
      email,
      items: JSON.stringify(items),
      totalAmount,
      status: "Pending",
      date: new Date(),
    });

    res.json({ message: "Order created", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    const orders = await Order.findAll({
      where: { email },
      order: [["date", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
