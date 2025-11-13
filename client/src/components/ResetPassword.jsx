import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        newPassword: password,
      });
      setSuccess("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/auth"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-4 tracking-wide">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 mb-4 rounded-md"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
        />
        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
        {success && <p className="text-green-600 text-xs mb-2">{success}</p>}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full bg-green-500 text-white py-3 tracking-wide rounded-md mb-2 ${
            isSubmitting
              ? "bg-gray-300 cursor-not-allowed"
              : "hover:bg-green-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
