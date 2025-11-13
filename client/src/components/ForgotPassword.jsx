
import React from "react";
import { FaLeaf, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import logo from "../assets/images/alover-logo.png";

const ForgotPassword = ({
  email,
  setEmail,
  error,
  success,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <div className=" flex justify-center items-center py-16 md:py-28  bg-linear-to-br from-green-50 via-emerald-100 to-green-200 px-4 relative">
      {/* Background floating shapes for a soft modern look */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-300 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-400 opacity-30 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl p-8 border border-green-100 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          {/* <FaLeaf className="text-green-600 text-4xl mb-2" /> */}
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 object-cover rounded-lg "
          />
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            Forgot Password?
          </h2>
          <p className="text-center text-gray-600 mt-2 text-sm">
            Enter your registered email address to receive a password reset
            link.
          </p>
        </div>

        {/* Input */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-4.5 text-green-500 text-base" />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full border border-gray-300 pl-9 p-3 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
          />
        </div>

        {/* Error / Success Messages */}
        {error && <p className="text-red-600 text-base mb-2">{error}</p>}
        {success && <p className="text-green-600 text-base mb-2">{success}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full flex items-center cursor-pointer justify-center gap-2 py-3 rounded-md text-white font-semibold tracking-wide transition-all ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg"
          }`}
        >
          <FaPaperPlane className="text-sm" />
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
