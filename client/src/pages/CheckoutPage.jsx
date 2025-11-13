import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { SiPhonepe } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import gpay from "../assets/images/gpay.png";
import SectionHeading from "../components/ui/SectionHeading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import emailjs from "@emailjs/browser";
import axios from "axios";

const SERVICE_ID = "service_jzk6dq8";
const TEMPLATE_ID = "template_8q0ozhq";
const PUBLIC_KEY = "16i9rAdZixJP9rw3i";
const admin_email = "ap8994168@gmail.com";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrImage, setQrImage] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const buyNowProduct = location.state?.buyNowProduct;
  const itemsToShow = buyNowProduct ? [buyNowProduct] : cartItems;

  const totalAmount = itemsToShow.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  const upiId = "chirvedaherbals@axl";
  const name = "Chirveda Herbals";
  const note = "Order Payment";

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(note)}`;

  // Generate desktop QR
  useEffect(() => {
    QRCode.toDataURL(upiLink).then((data) => setQrImage(data));
  }, [upiLink]);

  const handleUPIPayment = () => {
    window.location.href = upiLink;
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const email = user?.email || "";
    const orderId = "ORD-" + Date.now();

    try {
      await axios.post(`${API_BASE_URL}/api/orders`, {
        orderId,
        email,
        items: itemsToShow,
        totalAmount,
        status: "SUCCESS",
        paymentMethod: "UPI Manual",
        upiIdUsed: upiId,
        paidAt: new Date(),
      });

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          admin_email,
          order_id: orderId,
          date: new Date().toLocaleString(),
          orders: itemsToShow
            .map(
              (p) =>
                `${p.title} × ${p.quantity} = ₹${
                  p.discountedPrice * p.quantity
                }`
            )
            .join("\n"),
          total: totalAmount,
          email,
        },
        PUBLIC_KEY
      );

      clearCart();
      navigate("/order-confirmation", {
        state: { orderId, totalAmount, items: itemsToShow },
      });
    } catch (err) {
      console.error("Order error:", err);
      alert("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto my-8 md:my-16 px-4 sm:px-8">
      <SectionHeading
        title="Secure"
        highlight="Checkout"
        subtitle="Review your order and complete your payment safely."
      />

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Order Summary
        </h3>

        <ul className="divide-y divide-gray-200 mb-4">
          {itemsToShow.map((item) => (
            <li
              key={item.id}
              className="flex justify-between py-3 text-gray-700"
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹{item.discountedPrice * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
          <span>Total:</span>
          <span>₹{totalAmount}</span>
        </div>

        {/* MOBILE: GPay + PhonePe in one line */}
        <div className="md:hidden mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Pay Using UPI Apps
          </h3>

          <div className="flex items-center gap-3">
            <button
              onClick={handleUPIPayment}
              aria-label="Pay with Google Pay"
              className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:shadow-md"
            >
              <img src={gpay} alt="gpay" className="h-6 w-6" />
              <span className="text-sm font-medium">Google Pay</span>
            </button>

            <button
              onClick={handleUPIPayment}
              aria-label="Pay with PhonePe"
              className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:shadow-md"
            >
              <SiPhonepe className="text-2xl text-[#5F259F]" />{" "}
              {/* Violet PhonePe logo */}
              <span className="text-sm font-medium text-black">PhonePe</span>
            </button>
          </div>

          {/* One-line info text */}
          <p className="mt-3 text-sm text-gray-600">
            Pay securely via GPay or PhonePe.
          </p>

          <button
            onClick={handlePaymentConfirmation}
            disabled={isSubmitting}
            className={`mt-4 w-full px-6 py-2 bg-green-600 text-white rounded-lg font-medium shadow-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-green-700 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Processing..." : "I Have Paid"}
          </button>
        </div>
      </div>

      {/* DESKTOP: QR Scanner */}
      <div className="hidden md:flex flex-col items-center mt-8 border border-gray-200 rounded-xl p-6 bg-gray-50">
        <p className="text-gray-700 font-semibold mb-3">Scan the QR to Pay</p>

        {qrImage && (
          <img
            src={qrImage}
            alt="UPI QR"
            className="w-48 h-48 object-cover rounded-lg shadow"
          />
        )}

        <p className="text-sm text-gray-600 mt-3 select-all">
          UPI ID: <span className="font-bold">{upiId}</span>
        </p>

        <button
          onClick={handlePaymentConfirmation}
          disabled={isSubmitting}
          className={`mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-medium shadow-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-green-700 cursor-pointer"
          }`}
        >
          {isSubmitting ? "Processing..." : "I Have Paid"}
        </button>
      </div>

      {/* COMMON NOTE SECTION */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50 max-w-2xl mx-auto">
        <p className="text-sm text-gray-800 leading-relaxed mb-3">
          <strong>Important Note:</strong> After completing your payment, please
          click <strong>"I Have Paid"</strong> so we can verify and confirm your
          order. If you face any issue, send your payment screenshot on
          WhatsApp.
        </p>

        <div className="flex items-center space-x-4">
          <Link
            to="https://wa.me/+918793139572?text=Hi%2C%20I%20have%20completed%20my%20payment.%20Please%20confirm%20my%20order."
            target="_blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 shadow-md"
          >
            <IoLogoWhatsapp className="text-2xl text-white" />
          </Link>
          <span className="text-xs text-gray-600">
            Chat with us on WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
