import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get order data from navigate state
  const { orderId, totalAmount, items } = location.state || {};

  useEffect(() => {
    // If no order data, redirect to home or cart page
    if (!orderId || !items) {
      navigate("/cart"); // redirect to cart page if accessed directly
    }
  }, [orderId, items, navigate]);

  return (
    <div className="container mx-auto my-8 md:my-15 px-4 sm:px-8">
      <SectionHeading
        title="Order"
        highlight="Confirmed"
        subtitle="Your order has been successfully placed. Thank you for shopping with us!"
      />

      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-600 mb-4"> Payment Successful!</h2>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Order ID:</span> {orderId}
        </p>

        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Total Amount:</span> ₹{totalAmount}
        </p>

        <h3 className="text-xl font-semibold mb-2 text-gray-800">Order Summary:</h3>
        <ul className="divide-y divide-gray-200 mb-4">
          {items && items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 text-gray-700">
              <span>{item.title} × {item.quantity}</span>
              <span>₹{item.discountedPrice * item.quantity}</span>
            </li>
          ))}
        </ul>

        <p className="text-gray-600 mt-4">
          Admin has been notified and will confirm your order shortly.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
