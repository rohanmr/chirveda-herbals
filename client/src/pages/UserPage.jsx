import React, { useState, useRef, useEffect } from "react";
import {
  FaRegUser,
  FaSignInAlt,
  FaUserCircle,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const { user, logoutUser } = useUser(); // your context
  const offerClaimed = false; // optional
  const username =
    user?.name || (user?.email ? user.email.split("@")[0] : "Guest");
  const email = user?.email || null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = () => {
    logoutUser(); // clears user context
    setOpen(false);
    navigate("/auth");
  };

  const handleNavigate = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative inline-block">
      {/* User Icon Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-black hover:bg-gray-800 transition cursor-pointer transform hover:scale-110"
        aria-label="User menu"
        aria-expanded={open}
      >
        <FaRegUser className="text-xl text-white" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute -right-14 top-10 md:right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fadeIn"
          style={{ transformOrigin: "top right" }}
        >
          {!email ? (
            // Guest View
            <>
              <div className="px-6 py-4 bg-linear-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm cursor-pointer">
                    <FaRegUser className="text-2xl text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Welcome!</h3>
                    <p className="text-sm text-gray-600">Sign in to continue</p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={() => handleNavigate("/auth")}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-orange-100 transition-colors text-orange-600 font-semibold flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors cursor-pointer">
                    <FaSignInAlt className="text-orange-600 text-lg" />
                  </div>
                  <span>Login / Sign Up</span>
                </button>
              </div>
            </>
          ) : (
            // Logged In View
            <>
              <div className="px-6 py-4 bg-lienar-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shadow-md text-green-700 font-bold text-lg">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate">
                      {username}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{email}</p>
                    {offerClaimed && (
                      <div className="flex items-center gap-1.5 mt-2 text-green-600 text-xs font-semibold bg-white px-2 py-1 rounded-full w-fit">
                        <FaCheckCircle className="text-sm" />
                        <span>Offer Claimed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors cursor-pointer">
                    <FaUserCircle className="text-green-700 text-xl" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">My Profile</div>
                    <div className="text-xs text-gray-500">
                      View and edit profile
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate("/orders")}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors cursor-pointer">
                    <FaBoxOpen className="text-green-700 text-xl" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">My Orders</div>
                    <div className="text-xs text-gray-500">
                      Track your orders
                    </div>
                  </div>
                </button>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-100 p-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-orange-100 transition-colors text-orange-600 flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors cursor-pointer">
                    <GrLogout className="text-lg" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
