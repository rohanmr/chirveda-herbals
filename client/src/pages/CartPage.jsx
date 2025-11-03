import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  

  return (
    <div className="container mx-auto mt-28 px-4 sm:px-8">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 border-b pb-3">
        🛒 My Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 h-40 mb-4 opacity-80"
          />
          <p className="text-lg font-medium">Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-white shadow-lg rounded-xl p-6">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center py-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded-lg object-cover border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.discountedPrice} × {item.quantity}
                      </p>
                      <p className="font-semibold text-green-600">
                        ₹{item.discountedPrice * item.quantity}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 font-medium mt-3 sm:mt-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary Section */}
          <div className="lg:w-1/3 bg-white shadow-lg rounded-xl p-6 h-fit sticky top-24">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-700">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={clearCart}
                className="w-full px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
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
