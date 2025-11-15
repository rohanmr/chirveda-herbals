import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../../assets/images/chirveda_logos.png";
import {
  IoLogoWhatsapp,
  IoCart,
  IoHome,
  IoBagHandle,
  IoInformationCircle,
  IoCall,
  IoSparkles,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import UserPage from "../../pages/UserPage";

const Navbar = ({ searchQuery, setSearchQuery, onOpenCart }) => {

  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const { cartCount } = useCart();

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <IoHome className="text-xl text-green-600" />,
    },
    // {
    //   name: "Features",
    //   path: "/features",
    //   icon: <IoSparkles className="text-xl text-green-600" />,
    // },
    {
      name: "Products",
      path: "/products",
      icon: <IoBagHandle className="text-xl text-green-600" />,
    },
    {
      name: "About",
      path: "/about",
      icon: <IoInformationCircle className="text-xl text-green-600" />,
    },
    {
      name: "Contact Us",
      path: "/contact",
      icon: <IoCall className="text-xl text-green-600" />,
    },
  ];

  const handleSearchSubmit = () => {
    const trimmedSearch = localSearch.trim();
    if (trimmedSearch !== "") {
      navigate(`/products?search=${encodeURIComponent(trimmedSearch)}`);
      setSearchQuery(trimmedSearch);
    } 
    else {
      navigate("/products"); // Redirect to /products without search
      setSearchQuery("");   // Reset search query
    }
  };


  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-2 sm:px-2 lg:px-2">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="block px-2 sm:px-0">
            <div className="flex items-center sm:justify-start space-x-3 cursor-pointer">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform overflow-hidden">
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-base sm:text-lg md:text-2xl font-extrabold text-green-800 leading-tight tracking-wide">
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
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-3 top-2 text-gray-500 hover:text-green-600">
                <FaSearch />
              </button>
            </div>



            <div className="flex items-center space-x-5">
              <Link
                to="https://wa.me/+918793139572?text=Hi%20there!%20I%20want%20to%20know%20more%20about%20your%20services."
                target="_blank"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition transform hover:scale-110"
                title="Whatsapp"
              >
                <IoLogoWhatsapp className="text-xl text-white" />
              </Link>

              <UserPage />

              <button
                onClick={onOpenCart}
                className="relative flex cursor-pointer items-center justify-center w-8 h-8 rounded-full bg-orange-400 hover:bg-orange-500 transition transform hover:scale-110 "
                title="Cart"
              >
                <IoCart className="text-xl text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold py-px[1px] px-1.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex justify-end items-center space-x-5 lg:hidden">
            <Link
              to="https://wa.me/+918793139572?text=Hi%20there!%20I%20want%20to%20know%20more%20about%20your%20services."
              target="_blank"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition transform hover:scale-110"
              title="Whatsapp"
            >
              <IoLogoWhatsapp className="text-xl text-white" />
            </Link>

            <UserPage />

            <button
              onClick={onOpenCart}
              className="relative cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-orange-400 hover:bg-orange-500 transition transform hover:scale-110 "
              title="Cart"
            >
              <IoCart className="text-xl text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold py-px[1px] px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
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
            <input type="text" placeholder="Search..." className="w-full py-2 pl-4 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { handleSearchSubmit(); } }} /> 
            <button className="absolute right-3 top-2 text-gray-500 hover:text-green-600" onClick={handleSearchSubmit}></button>
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
