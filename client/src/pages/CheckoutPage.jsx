import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { SiPhonepe } from "react-icons/si";
import gpay from "../assets/images/gpay.png";
import SectionHeading from "../components/ui/SectionHeading";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_jzk6dq8";
const TEMPLATE_ID = "template_8q0ozhq";
const PUBLIC_KEY = "16i9rAdZixJP9rw3i";
const admin_email = "ap8994168@gmail.com";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart(); // get inside component
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [qrImage, setQrImage] = useState(null);

  const buyNowProduct = location.state?.buyNowProduct;
  const itemsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

  const totalAmount = itemsToShow.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  const upiId = "9011355075@ybl";
  const name = "Chirveda Herbals";
  const note = "Order Payment";

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(note)}`;

  // Generate QR code for desktop
  useEffect(() => {
    QRCode.toDataURL(upiLink).then((data) => setQrImage(data));
  }, [upiLink]);

  const handleUPIPayment = () => {
    window.location.href = upiLink;
    setPaymentStatus("pending");
  };

  const handlePaymentConfirmation = async () => {
    const orderId = "ORD-" + Date.now();
  const email = localStorage.getItem("email") || "guest@example.com";
    // Prepare products list
    const productsStr = itemsToShow
      .map((p) => `${p.title} × ${p.quantity} ₹${p.discountedPrice * p.quantity}`)
      .join("\n");


    try {
      // Send email to admin
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          admin_email,
          order_id: orderId,
          date: new Date().toLocaleString(),
          orders: productsStr,
          total: totalAmount,
          email: localStorage.getItem("email") || "guest@example.com",
          shipping: 0,
          tax: 0,
        },
        PUBLIC_KEY
      );



      // Save order to localStorage for order history
      const allOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
      allOrders.push({
        orderId,
        email,
        items: itemsToShow,
        totalAmount,
        date: new Date().toLocaleString(),
        status: "Pending", // default status
      });
      localStorage.setItem("userOrders", JSON.stringify(allOrders));

      // clear cart after order confirmation
      clearCart();

      // Navigate to Order Confirmation Page
      navigate("/order-confirmation", {
        state: {
          orderId,
          totalAmount,
          items: itemsToShow,
        },
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Failed to send email to admin.");
    }
  };

  return (
    <div className="container mx-auto my-8 md:my-15 px-4 sm:px-8">
      <SectionHeading
        title="Secure"
        highlight="Checkout"
        subtitle="Review your order and confirm your pure Aloe Vera products for glowing, healthy skin."
      />

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>

        <ul className="divide-y divide-gray-200 mb-4">
          {itemsToShow.map((item) => (
            <li key={item.id} className="flex justify-between py-3 text-gray-700">
              <span>{item.title} × {item.quantity}</span>
              <span>₹{item.discountedPrice * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
          <span>Total:</span>
          <span>₹{totalAmount}</span>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
          Select UPI Payment Option
        </h3>

        {/* MOBILE Buttons */}
        <div className="flex flex-wrap gap-3 justify-around md:justify-center md:hidden">
          <button
            onClick={handleUPIPayment}
            className="flex items-center space-x-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
          >
            <img src={gpay} alt="gpay" className="h-6 w-6" />
            <span>Google Pay</span>
          </button>

          <button
            onClick={handleUPIPayment}
            className="flex items-center space-x-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
          >
            <SiPhonepe className="text-2xl" />
            <span>PhonePe</span>
          </button>
        </div>

        {/* QR Desktop */}
        <div className="hidden md:flex flex-col items-center mt-6 border border-gray-200 rounded-xl p-5 bg-gray-50">
          <p className="text-gray-700 font-semibold mb-3">Scan & Pay (Any UPI App)</p>

          {qrImage && (
            <img
              src={qrImage}
              alt="UPI QR"
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          )}

          <p className="text-sm text-gray-600 mt-2 select-all">
            UPI ID: <span className="font-bold text-gray-800">{upiId}</span>
          </p>

          <button
            onClick={handlePaymentConfirmation}
            className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
          >
            I Have Paid
          </button>
        </div>

        {/* PENDING */}
        {paymentStatus === "pending" && (
          <div className="mt-6 text-center">
            <p className="text-yellow-600 font-medium mb-4">
              Payment initiated... Please complete in your UPI app.
            </p>

            <button
              onClick={handlePaymentConfirmation}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
            >
              I Have Paid
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
