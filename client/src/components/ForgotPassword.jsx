import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/auth/forgot-password", { email });
      setSuccess("Reset link sent! Check your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-4 tracking-wide">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Enter your email to receive a password reset link.
        </p>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full border p-3 mb-4 rounded-md"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
        />
        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}
        {success && <p className="text-green-600 text-xs mb-2">{success}</p>}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full bg-green-500 text-white py-3 tracking-wide rounded-md mb-2 ${
            isSubmitting ? "bg-gray-300 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}