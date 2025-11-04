import { FaRegUser } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border z-50 text-gray-700 font-medium">
          {!email ? (
            <>
              <div className="px-4 py-3 border-b text-gray-500">
                Hello, Guest
              </div>
              <button
                onClick={() => (window.location.href = "/auth")}
                className="w-full text-left px-4 py-3 hover:bg-green-50 transition"
              >
                Login / Signup
              </button>
            </>
          ) : (
            <>
              <div className="px-4 py-3 border-b text-gray-700">
                Hello, <span className="font-semibold">{username}</span>
              </div>
              <button
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition rounded-b-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
