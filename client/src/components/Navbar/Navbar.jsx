import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/images/alover-logo.png";
import {
  IoLogoWhatsapp,
  IoCart,
  IoHome,
  IoBagHandle,
  IoInformationCircle,
  IoCall,
  IoSparkles,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import UserPage from "../../pages/UserPage";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <IoHome className="text-xl text-black" />,
    },
    {
      name: "Features",
      path: "/features",
      icon: <IoSparkles className="text-xl text-black" />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <IoBagHandle className="text-xl text-black" />,
    },
    {
      name: "About",
      path: "/about",
      icon: <IoInformationCircle className="text-xl text-black" />,
    },
    {
      name: "Contact Us",
      path: "/contact",
      icon: <IoCall className="text-xl text-black" />,
    },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md transform hover:scale-110 transition-transform">
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-600 leading-tight logo-text">
                  CHIRVEDA HERBALS
                </h1>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-green-600 font-medium text-base transition nav-link"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative text-gray-600 border border-gray-300 rounded-full overflow-hidden">
              <input
                className="py-2 pl-4 pr-10 text-sm text-gray-700 bg-white focus:outline-none w-72"
                placeholder="Search..."
              />
              <button className="absolute right-3 top-2 text-gray-500 hover:text-green-600">
                <FaSearch />
              </button>
            </div>

            <div className="flex items-center space-x-5">
              <Link
                to="https://wa.me/+919022467707?text=Hi%20there!%20I%20want%20to%20know%20more%20about%20your%20services."
                target="_blank"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition transform hover:scale-110"
                title="Whatsapp"
              >
                <IoLogoWhatsapp className="text-xl text-white" />
              </Link>

              <UserPage />

              <Link
                to="/cart"
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-orange-400 hover:bg-orange-500 transition transform hover:scale-110 "
                title="Cart"
              >
                <IoCart className="text-xl text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold py-px[1px] px-1.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex justify-end items-center space-x-5 lg:hidden">
            <Link
              to="https://wa.me/+919022467707?text=Hi%20there!%20I%20want%20to%20know%20more%20about%20your%20services."
              target="_blank"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition transform hover:scale-110"
              title="Whatsapp"
            >
              <IoLogoWhatsapp className="text-xl text-white" />
            </Link>

            <UserPage />

            <Link
              to="/cart"
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-orange-400 hover:bg-orange-500 transition transform hover:scale-110"
              title="Cart"
            >
              <IoCart className="text-xl text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold py-px[1px] px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? (
                <IoMdClose className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 bg-white rounded-lg shadow-md mt-2 p-4 animate-slideDown space-y-3">
            <div className="relative text-gray-600 mb-2">
              <input
                placeholder="Search..."
                className="w-full py-2 pl-4 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none"
              />
              <button className="absolute right-3 top-2 text-gray-500 hover:text-green-600">
                <FaSearch />
              </button>
            </div>

            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
