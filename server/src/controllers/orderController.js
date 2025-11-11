const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { email, items, totalAmount, status, razorpayOrderId, razorpayPaymentId, userId } = req.body;

    if (!email || !items || !totalAmount) {
      return res.status(400).json({ message: "Email, items and totalAmount required" });
    }

    const order = await Order.create({
      orderId: "ORD-" + Date.now(),
      items,
      totalAmount,
      status: status || "PENDING",
      email,
      razorpayOrderId: razorpayOrderId || null,
      razorpayPaymentId: razorpayPaymentId || null,
      userId: userId || null,
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
