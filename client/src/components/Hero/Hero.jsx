import React from "react";
import aloeVeraImg from "../../assets/images/aloe-vera-blog.jpg";
import { FaLeaf } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-linear-to-br from-green-50 via-white to-green-100 md:pt-17 pb-2 lg:pb-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-8 lg:py-10 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right" className="space-y-6">
            {/* Badge */}
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              <FaLeaf className="inline mr-2 text-green-600" />
              Pure • Herbal • Natural
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold leading-tight text-gray-900 logo-text">
              Unlock Radiant Skin with
              <span className="block text-green-600">
                Pure Aloe Vera Goodness
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Discover the power of Ayurveda through our range of 100% pure
              herbal Aloe Vera products — made to heal, hydrate, and restore
              your natural glow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/products"
                className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-500 shadow-lg transform hover:scale-105 transition text-center"
              >
                <FaCartShopping className="inline mr-2 text-xl" /> Shop Now
              </Link>

              <Link
                to="/about"
                className="border border-green-600 text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 hover:text-white shadow-md transform hover:scale-105 transition text-center"
              >
                <FaLeaf className="inline mr-2 text-xl" /> Learn More
              </Link>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-6 pt-8 text-center text-gray-800">
              <div>
                <div className="text-[18px] sm:text-3xl font-bold text-green-600">
                  100%
                </div>
                <div className="text-sm sm:text-lg">Natural Ingredients</div>
              </div>
              <div>
                <div className="text-[18px] sm:text-3xl font-bold text-green-600">
                  500+
                </div>
                <div className="text-sm sm:text-lg">Happy Customers</div>
              </div>
              <div>
                <div className="text-[18px] sm:text-3xl font-bold text-green-600">
                  Cruelty Free
                </div>
                <div className="text-sm sm:text-lg">Vegan Products</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative" data-aos="fade-left">
            <img
              src={aloeVeraImg}
              alt="Aloe Vera Gel Product"
              className="w-full rounded-3xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
