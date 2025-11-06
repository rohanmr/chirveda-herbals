import React, { useState, useEffect, useRef } from "react";
import { FaRegUser, FaSignInAlt, FaUser, FaCheckCircle } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { FaBoxOpen, FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const offerClaimed = localStorage.getItem("offerClaimed") === "yes";

  // ✅ Load user from localStorage directly
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("email"); // optional
    setUser(null);
    setOpen(false);
    window.location.reload();
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const username = user?.name || (user?.email ? user.email.split("@")[0] : "Guest");
  const email = user?.email || null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-black hover:bg-gray-800 transition cursor-pointer transform hover:scale-110"
        title="Account"
      >
        <FaRegUser className="text-xl text-white" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute -right-4 md:right-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-green-100 z-50 text-gray-700 font-medium overflow-hidden">

          {!email ? (
            // ✅ When user NOT logged in
            <>
              <div className="px-5 py-4 border-b border-green-50 text-gray-500">
                👋 Welcome, Guest
              </div>

              <button
                onClick={() => navigate("/auth")}
                className="w-full text-left px-5 py-3 hover:bg-green-50 cursor-pointer transition-colors text-green-700 font-semibold flex items-center gap-2"
              >
                <FaSignInAlt className="text-green-600 text-xl" />
                Login / Signup
              </button>
            </>
          ) : (
            // ✅ When logged-in user
            <>
              <div className="px-5 py-4 border-b border-green-50 text-gray-800 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FaUser className="text-green-600 text-xl" />
                  <span className="font-bold text-green-700">{username}</span>
                </div>
                <p className="text-gray-600 text-sm">{email}</p>

                {offerClaimed && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <FaCheckCircle /> Offer claimed!
                  </div>
                )}
              </div>

              {/* Profile */}
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-5 py-3 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-2"
              >
                <FaCircleUser className="text-green-700 text-xl" />
                My Profile
              </button>

              {/* Orders */}
              <button
                onClick={() => navigate("/orders")}
                className="w-full text-left px-5 py-3 hover:bg-green-50 cursor-pointer transition-colors flex items-center gap-2"
              >
                <FaBoxOpen className="text-green-700 text-xl" />
                My Orders
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-3 hover:bg-red-50 cursor-pointer text-red-600 transition-colors flex items-center gap-2 border-t border-gray-100"
              >
                <GrLogout className="text-xl" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
