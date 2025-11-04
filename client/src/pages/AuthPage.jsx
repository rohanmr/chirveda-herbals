import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = "service_jzk6dq8";
  const TEMPLATE_ID = "template_su2zo3l";
  const PUBLIC_KEY = "16i9rAdZixJP9rw3i";

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSendOtp = async () => {
    if (!email.trim()) return alert("Please enter a valid email");
    setLoading(true);

    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { user_email: email, otp_code: otpCode },
        PUBLIC_KEY
      );
      setStep(2);
      alert(`OTP sent to ${email}`);
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Failed to send OTP. Check your EmailJS config.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) return alert("Please enter the OTP");

    if (otp === generatedOtp) {
      alert("OTP verified successfully!");
      localStorage.setItem("email", email);
      window.location.href = "/";
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <section className="py-8 px-3 bg-linear-to-b md:justify-center md:flex md:py-24 from-green-200 to-white">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Chirveda Herbals 🌿
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in or sign up to continue shopping
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white cursor-pointer py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full outline-none text-center tracking-widest font-semibold"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={4}
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-3 cursor-pointer rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </div>
        )}

        <div className="mt-6 text-gray-500 text-sm">
          By signing in, you agree to our{" "}
          <span className="text-green-600 font-semibold">
            Terms & Conditions
          </span>
        </div>
      </div>
    </section>
  );
}
