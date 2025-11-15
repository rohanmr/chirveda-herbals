const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------------------------------------------------
   1️⃣ CREATE RAZORPAY ORDER  (FAILED ORDER)
---------------------------------------------------- */
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, items, email, userId } = req.body;
    if (!amount || !items || !email) {
      return res.status(400).json({ message: "amount, items and email required" });
    }

    const rpOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // in paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
      payment_capture: 1,
    });

    // Create internal order with status FAILED
    const orderRecord = await Order.create({
      orderId: "ORD-" + Date.now(),
      razorpayOrderId: rpOrder.id,
      items,
      totalAmount: amount,
      status: "FAILED",
      paymentMethod: "ONLINE",   // ✅ FIXED
      userId: userId || null,
      email,
    });

    res.json({ success: true, razorpayOrder: rpOrder, order: orderRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Could not create razorpay order" });
  }
};

/* ---------------------------------------------------
   2️⃣ VERIFY PAYMENT (SUCCESS or FAILED)
---------------------------------------------------- */
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    /* -----------------------------
       ❌ PAYMENT FAILED
    ------------------------------ */
    if (expectedSignature !== razorpay_signature) {
      await Order.update(
        {
          status: "FAILED",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentMethod: "ONLINE",   // ✅ FIXED
        },
        { where: { razorpayOrderId: razorpay_order_id } }
      );

      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    /* -----------------------------
       ✅ PAYMENT SUCCESS
    ------------------------------ */
    await Order.update(
      {
        status: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentMethod: "ONLINE",   // ✅ FIXED
        paidAt: new Date(),        // ✅ FIXED
      },
      { where: { razorpayOrderId: razorpay_order_id } }
    );

    // Return updated order record
    const updatedOrder = await Order.findOne({ where: { razorpayOrderId: razorpay_order_id } });

    return res.json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Verification error" });
  }
};
