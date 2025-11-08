import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaTrashAlt, FaBolt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import SectionHeading from "./ui/SectionHeading";

export default function CartDrawer({ open, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const savings = originalTotal - totalAmount;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    if (open) onClose();
  }, [location.pathname]);

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { buyNowProduct: item } });
    onClose();
  };

  const handlePlaceOrder = () => {
    navigate("/checkout", { state: { cartItems } });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[50vw] lg:w-[40vw] xl:w-[35vw] bg-gray-50 shadow-2xl z-50 transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center px-4 py-3 ">
            <h2 className="text-2xl font-bold text-black text-center ">
              My <span className="logo-text">Cart</span>
            </h2>

            <button
              onClick={onClose}
              className="text-gray-600 cursor-pointer text-2xl hover:text-gray-800"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 mt-16 px-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-32 h-auto mb-6 opacity-70"
            />
            <p className="text-xl font-semibold text-gray-700">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Add items to get started
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-transform"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-2 px-4 py-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white px-4 py-4 rounded-md border border-gray-200 flex flex-col"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 rounded object-contain border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-700 font-bold text-lg">
                          ₹{item.discountedPrice?.toLocaleString()}
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          ₹{item.originalPrice?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center mb-2 border border-gray-300 rounded overflow-hidden w-max">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-sm font-semibold bg-white text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="hidden md:flex text-red-600 hover:text-red-800 cursor-pointer font-semibold"
                      >
                        <FaTrashAlt className="text-2xl" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end md:hidden">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className=" text-red-600 hover:text-red-800 cursor-pointer font-semibold"
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer - Flipkart style */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg px-4 py-3">
              {/* Top Summary - Show first two products */}
              <div className="flex flex-col gap-2 mb-3">
                {cartItems.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{item.title}</span>
                    <span>
                      ₹{(item.discountedPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                {cartItems.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{cartItems.length - 2} more item(s)
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="flex justify-between font-semibold text-gray-900 mb-3">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-900 font-bold py-3 rounded text-lg transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold py-3 rounded text-lg transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
