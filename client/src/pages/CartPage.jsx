import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

import SectionHeading from "../components/ui/SectionHeading";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div className="container mx-auto my-8 md:my-15 px-4 sm:px-8">
      <SectionHeading
        title="My"
        highlight="Shopping Cart"
        subtitle="Review your natural Aloe Vera picks before completing your order."
      />

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-36 sm:w-48 h-auto mb-6 opacity-80"
          />
          <p className="text-xl font-semibold text-gray-700">
            Your cart is empty
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-linear-to-r from-green-600 cursor-pointer to-lime-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-transform"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 bg-white shadow-xl rounded-2xl p-4 sm:p-8 border border-gray-100">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center py-5 hover:bg-gray-50 transition rounded-xl px-2 sm:px-4 gap-4"
                >
                  {/* Left Section (Image + Details) */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-gray-200"
                    />

                    <div className="flex flex-col w-full">
                      {/* Product Info */}
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg md:text-xl leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 mt-1">
                        ₹{item.discountedPrice} × {item.quantity}
                      </p>
                      <p className="font-semibold text-green-600 text-base sm:text-lg">
                        ₹{item.discountedPrice * item.quantity}
                      </p>

                      {/* Quantity Controls + Trash (Mobile) */}
                      <div className="flex items-center justify-between mt-3 w-full">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold rounded-md transition"
                          >
                            -
                          </button>

                          <span className="text-gray-800 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-md transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Trash Icon (Mobile Only) */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer font-semibold md:hidden ml-4"
                        >
                          <FaTrashAlt className="text-xl sm:text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trash Icon (Desktop Only) */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="hidden md:flex text-red-600 hover:text-red-800 cursor-pointer font-semibold"
                  >
                    <FaTrashAlt className="text-2xl" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary Section */}
          <div className="lg:w-1/3 bg-white shadow-xl rounded-2xl p-6 sm:p-8 h-fit sticky top-28 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={clearCart}
                className="w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold transition-all"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3 bg-linear-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
