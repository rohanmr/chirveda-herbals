import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddressPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const buyNowProduct = location.state?.buyNowProduct || null;

  const [checkingAddress, setCheckingAddress] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      contactNumber: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  useEffect(() => {
    // 1️⃣ Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth");
      return;
    }

    // 2️⃣ Check if user address already exists in localStorage
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      const address = JSON.parse(savedAddress);
      // Directly navigate to checkout if address exists
      navigate("/checkout", {
        state: buyNowProduct
          ? { buyNowProduct, address }
          : { cartItems, address },
      });
    } else {
      setCheckingAddress(false); // show address form for new users
    }
  }, [buyNowProduct, cartItems, navigate]);

  const onSubmit = async (data) => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userEmail = user?.email || "";

      // Save to backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/address`, {
        ...data,
        userEmail,
      });

      // Save to localStorage so next time they skip address page
      localStorage.setItem("userAddress", JSON.stringify(data));

      // Navigate to checkout
      navigate("/checkout", {
        state: buyNowProduct
          ? { buyNowProduct, address: data }
          : { cartItems, address: data },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save address. Please try again.");
    }
  };

  if (checkingAddress) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Checking saved address...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-lg border border-green-100">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          Delivery Address
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contact Number *
            </label>
            <input
              type="text"
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
              placeholder="Enter your phone number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Address *</label>
            <textarea
              {...register("addressLine", { required: "Address is required" })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white resize-none"
              placeholder="House number, street, area"
              rows={3}
            />
            {errors.addressLine && (
              <p className="text-red-500 text-sm mt-1">{errors.addressLine.message}</p>
            )}
          </div>

          {/* City + State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">City *</label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
                placeholder="City"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">State *</label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
                placeholder="State"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pincode *</label>
            <input
              type="text"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: "Enter a valid 6-digit pincode",
                },
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white"
              placeholder="Enter pincode"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-green-600 to-lime-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-lime-700 shadow-md hover:shadow-lg transition transform hover:scale-105 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Continue to Checkout"}
          </button>
        </form>
      </div>
    </section>
  );
}
