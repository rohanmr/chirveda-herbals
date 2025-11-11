import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AuthPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { loginUser } = useUser();

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

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
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

        showToast("success", "Login successful!");

        // Redirect immediately after setting user
        navigate("/");
      } else {
        await axios.post(`${API_BASE_URL}/api/auth/register`, {
          name,
          email,
          password,
        });
        showToast("success", "Account created successfully! Please login.");
        setMode("login");
        setPassword("");
        passwordRef.current?.focus();
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Server error";
      if (mode === "login" && errorMsg.includes("User not found")) {
        showToast("error", "Invalid user. Please create an account first.");
      } else {
        showToast("error", errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 relative">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-50 animate-toastSlideRight ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-white rounded-xl w-full max-w-md shadow-xl p-8 relative z-10">
        <h2 className="text-3xl font-semibold text-center mb-4 tracking-wide cursor-pointer">
          {mode === "login" ? "LOGIN" : "SIGN UP"}
        </h2>

        <p className="text-center text-gray-600 mb-4 text-sm">
          {mode === "login"
            ? "Enter your email and password to login:"
            : "Please fill in the information below to create an account."}
        </p>

        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 mb-4 rounded-md cursor-pointer"
              value={name}
              onChange={handleNameChange}
            />
            {errors.name && (
              <p className="text-red-600 text-xs mb-2">{errors.name}</p>
            )}
          </>
        )}

        <input
          type="email"
          placeholder="E-mail"
          className="w-full border p-3 mb-4 rounded-md"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mb-2">{errors.email}</p>
        )}

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 rounded-md"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && (
          <p className="text-red-600 text-xs mb-2">{errors.password}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full bg-green-500 text-white py-3 tracking-wide rounded-md mb-2 
    ${
      isSubmitting
        ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
        : "hover:bg-green-600 cursor-pointer"
    }`}
        >
          {isSubmitting
            ? "Submitting..."
            : mode === "login"
            ? "LOGIN"
            : "CREATE ACCOUNT"}
        </button>

        {mode === "login" && (
          <p
            className="text-center mt-3 text-sm underline cursor-pointer"
            onClick={() => navigate("/forget-password")}
          >
            Forgot Password?
          </p>
        )}

        <p
          className="mt-5 text-center text-sm cursor-pointer underline"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </div>

      <style>
        {`
          @keyframes toastSlideRight {
            0% { opacity: 0; transform: translateX(100%) translateY(0); }
            100% { opacity: 1; transform: translateX(0) translateY(0); }
          }
          .animate-toastSlideRight {
            animation: toastSlideRight 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
