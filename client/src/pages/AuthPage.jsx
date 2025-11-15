

import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaLock,
  FaEnvelope,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import logo from "../assets/images/alover-logo.png";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginUser } = useUser();
  const { reloadCart } = useCart();
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Live validation
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    setErrors((prev) => ({
      ...prev,
      name: !val.trim() ? "Name is required" : null,
    }));
  };
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setErrors((prev) => ({
      ...prev,
      email: !val.trim()
        ? "Email is required"
        : !emailRegex.test(val)
          ? "Enter a valid email"
          : null,
    }));
  };
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setErrors((prev) => ({
      ...prev,
      password: !val.trim() ? "Password is required" : null,
    }));
  };

  const validateBeforeSubmit = () => {
    const errs = {};
    if (mode === "register" && !name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!emailRegex.test(email)) errs.email = "Enter a valid email";
    if (!password.trim()) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateBeforeSubmit()) return;
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email,
          password,
        });
        const userData = res.data.user; // user info from backend
        const token = res.data.token;

        if (token) localStorage.setItem("token", token); // optional for API
        loginUser(userData); //  set user in context immediately
        reloadCart();
        toast.success("Login successful!");
        navigate("/");
      } else {
        await axios.post(`${API_BASE_URL}/api/auth/register`, {
          name,
          email,
          password,
        });

        toast.success("Account created successfully! Please login.");
        setMode("login");
        setPassword("");
        setTimeout(() => passwordRef.current?.focus(), 50);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Server error";
      if (mode === "login" && errorMsg.includes("User not found")) {
        toast.error("Invalid user. Please create an account first.");
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex justify-center items-center py-16 md:py-28  bg-linear-to-br from-green-50 via-emerald-100 to-green-200 px-4 relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-300 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 opacity-30 rounded-full blur-3xl"></div>

      {/* Form Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl p-8 relative z-10 border border-green-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          {/* <FaLeaf className="text-green-600 text-4xl mb-2" /> */}
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 object-cover rounded-lg "
          />
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-600 mt-2 text-center text-sm">
            {mode === "login"
              ? "Log in to explore our natural skincare collection."
              : "Join us for a fresh, organic skincare experience."}
          </p>
        </div>

        {/* Form Fields */}
        {mode === "register" && (
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-4.5 text-green-500 text-base" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 pl-9 p-3 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={name}
              onChange={handleNameChange}
            />
            {errors.name && (
              <p className="text-red-600 text-sm md:text-base mt-1">
                {errors.name}
              </p>
            )}
          </div>
        )}

        <div className="relative mb-4 align-middle">
          <FaEnvelope className="absolute left-3 top-4.5 text-green-500 text-base" />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full border border-gray-300 pl-9 p-3 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && (
            <p className="text-red-600 text-sm md:text-base mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-4.5 text-green-500 text-base" />
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 pl-9 p-3 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={password}
            onChange={handlePasswordChange}
          />

          <span
            className="absolute right-3 top-4 cursor-pointer text-gray-500 hover:text-green-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-600 text-sm md:text-base mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 rounded-md text-white font-semibold cursor-pointer tracking-wide transition-all ${isSubmitting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg"
            }`}
        >
          {isSubmitting
            ? "Submitting..."
            : mode === "login"
              ? "Login"
              : "Create Account"}
        </button>

        {/* Forgot Password */}
        {mode === "login" && (
          <p
            className="text-center mt-4 text-base text-green-700 hover:underline cursor-pointer"
            onClick={() => navigate("/forget-password")}
          >
            Forgot Password?
          </p>
        )}

        {/* Switch Mode */}
        <p
          className="mt-6 text-center text-base text-gray-700 cursor-pointer hover:text-green-700 hover:underline"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "Don’t have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}


