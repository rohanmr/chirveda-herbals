import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheck,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../../assets/images/alover-logo.png";

const Footer = () => {
  const productList = [
    "Pure Aloe Vera Gel",
    "Aloe Vera Moisturizing Cream",
    "Aloe Vera Shampoo",
    "Aloe Vera Gel EL",
    "Aloe Vera Face Wash",
  ];
  return (
    <footer className="bg-gray-900 text-white pl-6 md:pl-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div data-aos="zoom-in-right">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold logo-text">CHIRVEDA HERBALS</h3>
            </div>
            <p className="text-gray-400 mb-4">
              ANCIENT WISDOM, MODERN WELLNESS
            </p>
            <p className="text-sm text-gray-500">
              Giving Future to Your Health
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-md">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white transition"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Products</h4>
            <ul className="space-y-2 text-gray-400 text-md">
              {productList.map((item, index) => (
                <li key={index}>
                  <FaCheck className="text-green-500 inline mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400 text-md">
              <li>
                <FaMapMarkerAlt className="text-green-500 inline mr-2 text-lg" />
                123 xyz, Pune, MH 411001
              </li>
              <li>
                <FaPhoneAlt className="text-green-500 inline mr-2 text-lg" />
                +91 123456789
              </li>
              <li>
                <FaEnvelope className="text-green-500 inline mr-2 text-lg" />
                chirveda@gmail.com
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 text-xl">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6 text-center text-md text-gray-500">
          &copy; {new Date().getFullYear()} CHIRVEDA HERBALS. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
