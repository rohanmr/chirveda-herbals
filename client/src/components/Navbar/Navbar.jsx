import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/images/alover-logo.png";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Row */}
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md transform hover:scale-110 transition-transform">
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-[18px] sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight logo-text">
                CHIRVEDA HERBALS
              </h1>
              <p className="text-[10px] sm:text-xs text-green-600 font-medium tracking-wide">
                ANCIENT WISDOM, MODERN WELLNESS
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item, i) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-green-600 font-medium text-base transition nav-link"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative text-gray-600 focus-within:text-green-600 border border-gray-300 rounded-full overflow-hidden">
              <input
                type="search"
                placeholder="Search..."
                className="py-2 pl-4 pr-10 text-sm text-gray-700 bg-white focus:outline-none w-72"
              />
              <button
                type="submit"
                className="absolute right-3 top-2 text-gray-500 hover:text-green-600"
              >
                <FaSearch />
              </button>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5 text-gray-700">
              <button
                className="hover:text-green-600 transition transform hover:scale-110 cursor-pointer"
                title="Account"
              >
                <FaRegUser className="text-xl" />
              </button>

              <button
                className="relative hover:text-green-600 transition transform hover:scale-110 cursor-pointer"
                title="Cart"
              >
                <IoCartOutline className="text-2xl" />
                <span className="absolute -top-4 -right-4 bg-green-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                  2
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex justify-end items-center space-x-5 lg:hidden">
            <button className="text-gray-700 hover:text-green-600">
              <FaRegUser className="text-xl" />
            </button>

            <button className="relative text-gray-700 hover:text-green-600">
              <IoCartOutline className="text-2xl" />
              <span className="absolute -top-4 -right-4 bg-green-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                2
              </span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none cursor-pointer"
            >
              {isMenuOpen == true ? (
                <IoMdClose className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3 bg-white rounded-lg shadow-md mt-2 p-4 animate-slideDown">
            {/* Search on Mobile */}
            <div className="relative text-gray-600 focus-within:text-green-600 mb-2">
              <input
                type="search"
                placeholder="Search..."
                className="w-full py-2 pl-4 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-2 text-gray-500 hover:text-green-600"
              >
                <FaSearch />
              </button>
            </div>

            {/* Mobile Links */}
            {navLinks.map((item, i) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
