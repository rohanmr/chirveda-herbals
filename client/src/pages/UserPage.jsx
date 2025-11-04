import { FaRegUser, FaSignInAlt, FaUser } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FaBoxOpen } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const username = email ? email.split("@")[0] : null;

  const handleLogout = () => {
    localStorage.removeItem("email");
    setOpen(false);
    window.location.reload();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-black hover:bg-gray-800 transition cursor-pointer transform hover:scale-110"
        title="Account"
      >
        <FaRegUser className="text-xl text-white" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute -right-4 md:right-0 mt-2 w-60 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 z-50 text-gray-700 font-medium overflow-hidden">
          {!email ? (
            <>
              {/* Header */}
              <div className="px-5 py-4 border-b border-green-50 text-gray-500">
                👋 Welcome, Guest
              </div>

              {/* Login Button */}
              <button
                onClick={() => navigate("/auth")}
                className="w-full text-left px-5 py-3 hover:bg-green-50 cursor-pointer transition-colors text-green-700 font-semibold flex items-center gap-2"
              >
                <FaSignInAlt className="text-green-600 text-xl" />
                Login / Signup
              </button>
            </>
          ) : (
            <>
              {/* Logged In User Header */}
              <div className="px-5 py-4 border-b border-green-50 text-gray-800 flex items-center gap-2">
                <i className="fas fa-user-circle text-green-600 text-xl"></i>
                <span>
                  👋🏼{" "}
                  <span className="font-bold text-green-700">{username}</span>
                </span>
              </div>

              {/* Profile / Orders Links */}
              <button
                onClick={() => (window.location.href = "/profile")}
                className="w-full text-left px-5 py-3 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-2"
              >
                <FaCircleUser className="text-green-700 text-xl" /> My Profile
              </button>
              <button
                onClick={() => (window.location.href = "/orders")}
                className="w-full text-left px-5 py-3 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-2"
              >
                <FaBoxOpen className="text-green-700 text-xl" />
                My Orders
              </button>

              {/* Logout */}
              <button
                className="w-full text-left px-5 py-3 hover:bg-red-50 cursor-pointer text-red-600 transition-colors flex items-center gap-2 border-t border-gray-100"
                onClick={handleLogout}
              >
                <GrLogout className="text-xl" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
