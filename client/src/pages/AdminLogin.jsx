import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/images/alover-logo.png";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const user = res.data.user;

      if (user.role !== "admin") {
        toast.error("Access Denied. Admin Only.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      toast.success("Admin Login Successful!");
      navigate("/admin-page");a
    } catch (err) {
      toast.error("Invalid admin credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-16 md:py-28 bg-linear-to-br from-green-50 via-emerald-100 to-green-200 px-4 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-300 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 opacity-30 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl p-8 z-10 border border-green-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-12 h-12 object-cover rounded-lg" />
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            Admin Login
          </h2>
          <p className="text-gray-600 mt-2 text-center text-sm">
            Enter your admin credentials to access dashboard.
          </p>
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-4.5 text-green-500 text-base" />
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border border-gray-300 pl-9 p-3 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-4.5 text-green-500 text-base" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 pl-9 p-3 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute right-3 top-4 cursor-pointer text-gray-500 hover:text-green-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className={`w-full py-3 rounded-md text-white font-semibold transition-all ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isSubmitting ? "Logging in..." : "Login as Admin"}
        </button>

        {/* Back to User Login */}
        <p
          className="mt-6 text-center text-base text-gray-700 cursor-pointer hover:text-green-700 hover:underline"
          onClick={() => navigate("/auth")}
        >
          Back to User Login
        </p>
      </div>
    </div>
  );
}
