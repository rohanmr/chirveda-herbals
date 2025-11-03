import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { SiPhonepe } from "react-icons/si"; // 🔹 UPI icons
import gpay from "../assets/images/gpay.png";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [paymentStatus, setPaymentStatus] = useState(null);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  

  const upiId = "rushikesh@oksbi"; // replace with your actual UPI ID

  const handleUPIPayment = (app) => {
    const name = "Chirveda Herbals";
    const note = "Order Payment";
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name
    )}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(note)}`;

    window.location.href = upiLink;
    setPaymentStatus("pending");
  };

  return (
    <div className="container mx-auto mt-24 px-4 sm:px-8">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 border-b pb-3">
        Checkout
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Order Summary
        </h3>

        <ul className="divide-y divide-gray-200 mb-4">
          {cartItems.map((item) => (
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

        <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
          Select UPI Payment Option
        </h3>

        <div className="flex flex-wrap gap-4 justify-center">
          {/* Google Pay Button */}
          <button
            onClick={() => handleUPIPayment("gpay")}
            className="flex items-center space-x-2 px-5 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
          >
            {/* <SiGooglepay className="text-2xl" /> */}
            <img src={gpay} alt="gpay" className="h-8 w-8" />
            <span>Pay with GPay</span>
          </button>

          {/* PhonePe Button */}
          <button
            onClick={() => handleUPIPayment("phonepe")}
            className="flex items-center space-x-2 px-5 py-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
          >
            <SiPhonepe className="text-2xl" />

            <span>Pay with PhonePe</span>
          </button>
        </div>

        {paymentStatus === "pending" && (
          <p className="text-yellow-600 font-medium mt-6 text-center">
            Payment initiated... Please complete it in your UPI app.
          </p>
        )}

        {paymentStatus === "success" && (
          <p className="text-green-600 font-medium mt-6 text-center">
            Payment successful! Thank you for shopping with us.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
