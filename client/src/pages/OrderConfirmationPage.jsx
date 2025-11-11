import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, totalAmount, items, email } = location.state || {};

  useEffect(() => {
    // If order info is missing, redirect to cart
    if (!orderId || !items) {
      navigate("/cart");
    }
  }, [orderId, items, navigate]);

  if (!orderId || !items) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Page Heading */}
        <div className="mb-6">
          <SectionHeading title="Order" highlight="Confirmed" />
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-6 sm:px-8 sm:py-8 border-b border-green-100">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 sm:h-10 sm:w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-green-700 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-md mx-auto">
                Thank you for choosing <span className="font-semibold text-orange-600">Chirveda Herbals</span>. 
                Your order is being processed and you'll receive a confirmation email shortly.
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="px-5 py-6 sm:px-8 sm:py-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-200 text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Order ID</span>
                <span className="text-gray-900 font-semibold break-all ml-2">{orderId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="text-gray-900 font-bold">₹{typeof totalAmount === 'number' ? totalAmount.toFixed(2) : totalAmount}</span>
              </div>
              <div className="flex justify-between py-2 text-sm sm:text-base">
                <span className="text-gray-600 font-medium">Items Ordered</span>
                <span className="text-gray-900 font-semibold">
                  {items?.length || 0} {items?.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6 text-sm sm:text-base">
              <div className="flex items-start">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-blue-800">
                  A confirmation email with your order details has been sent to your email address.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => navigate("/products")}
                className="w-full px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-sm transition-all duration-200 cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                onClick={() =>
                  navigate("/orders", { state: { email } }) // Pass email to OrdersPage
                }
                className="w-full px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center text-sm sm:text-base">
          <p className="text-gray-600">
            Need help? <a href="/contact" className="text-green-600 hover:text-green-700 font-semibold underline">Contact Support</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default OrderConfirmationPage;
