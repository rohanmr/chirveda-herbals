import React, { useState, useEffect } from "react";
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
  FaLock,
} from "react-icons/fa";
import logo from "../../assets/images/alover-logo.png";
import sslBadge from "../../assets/images/ssl.png";
import gmp from "../../assets/images/gmp.png";
import paymentLogos from "../../assets/images/paymentlog.png";
import fssai from "../../assets/images/fssai.png";
import ayush from "../../assets/images/ayush.png";

const Footer = () => {
  const productList = [
    "Pure Aloe Vera Gel",
    "Aloe Vera Moisturizing Cream",
    "Aloe Vera Shampoo",
    "Aloe Vera Gel EL",
    "Aloe Vera Face Wash",
  ];

  // DPDP Cookie Consent
  // const [showBanner, setShowBanner] = useState(false);
  // useEffect(() => {
  //   const consent = localStorage.getItem("cookieConsent");
  //   if (!consent) setShowBanner(true);
  // }, []);

  // const handleConsent = () => {
  //   localStorage.setItem("cookieConsent", "true");
  //   setShowBanner(false);
  // };

  return (
    <>
      <footer className="bg-gray-900 text-white md:pl-0">
        <div className="container mx-auto px-8  lg:px-8 py-12">
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
                <h3 className="text-xl font-bold logo-text">
                  CHIRVEDA HERBALS
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                ANCIENT WISDOM, MODERN WELLNESS
              </p>
              <p className="text-sm text-gray-500">
                Ancient Wisdom, Modern Skin.
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
                {/* <li>
                  <Link
                    to="/features"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Features
                  </Link>
                </li> */}
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
                  Chirveda Herbal's, plot no G / 45, MIDC Baramati, PIN code -
                  413133
                </li>
                <li>
                  <FaPhoneAlt className="text-green-500 inline mr-2 text-lg" />
                  +91 8793139572
                </li>
                <li>
                  <FaEnvelope className="text-green-500 inline mr-2 text-lg" />
                  contact@chirvedaherbals.com
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex space-x-4 mt-4 text-xl">
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaTwitter />
                </Link>
                <Link
                  to="https://www.instagram.com/chirvedaherbals?igsh=emFjbjZoNWFkMnNk"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaLinkedinIn />
                </Link>
              </div>
            </div>
          </div>

          {/* New Trust & Compliance Section */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-base space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
              <Link to="/returns" className="hover:text-white">
                Returns & Refunds
              </Link>
              <Link to="/shipping" className="hover:text-white">
                Shipping Policy
              </Link>
            </div>

            <div className="text-center md:text-right">
              <p className="text-base text-gray-500 hover:text-white">
                Licensed under AYUSH | FSSAI: 21525000001176
              </p>
            </div>
          </div>

          {/* SSL + Payment Logos */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-gray-800 pt-6">
            <div className="flex items-center space-x-2 text-gray-400 text-base">
              <img
                src={sslBadge}
                alt="SSL Secure"
                className="h-14 sm:h-24 w-auto object-contain drop-shadow-md"
              />
              <img
                src={gmp}
                alt="GMP"
                className="h-14 sm:h-24 w-auto object-contain drop-shadow-md"
              />
              <img
                src={ayush}
                alt="ayush"
                className="h-14 sm:h-24 w-auto object-contain drop-shadow-md"
              />
              <img
                src={fssai}
                alt="FSSAI"
                className="h-14 sm:h-24 w-auto object-contain drop-shadow-md"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <img
                src={paymentLogos}
                alt="Trusted Payments"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-6 text-center text-md text-gray-500 mt-6">
            &copy; {new Date().getFullYear()} CHIRVEDA HERBALS. All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* DPDP Cookie Consent Banner
      {showBanner && (
        <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-gray-200 p-4 text-sm md:text-base flex flex-col md:flex-row justify-between items-center shadow-lg z-50">
          <p className="mb-2 md:mb-0 text-center md:text-left">
            We use cookies for analytics and personalized marketing. By
            continuing to browse, you consent to our{" "}
            <Link to="/privacy-policy" className="underline text-green-400">
              Privacy Policy
            </Link>
            .
          </p>
          <button
            onClick={handleConsent}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-2 md:mt-0"
          >
            Accept
          </button>
        </div>
      )} */}
    </>
  );
};

export default Footer;
