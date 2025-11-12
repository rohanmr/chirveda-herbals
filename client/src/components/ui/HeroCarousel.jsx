import React from "react";
import { Link } from "react-router-dom";
import banner1 from "../../assets/images/banner5.png";

const HeroCarousel = () => {
  const slide = {
    id: 1,
    image: banner1,
    title: "Pure Aloe Care - Hydrating, non-sticky & soothing",
    subtitle: "For soft, glowing skin every day.",
    link: "/products",
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden shadow-lg mb-12">
      {/* Background Image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
          {slide.title}
        </h2>
        <p className="text-gray-200 text-sm md:text-lg mb-6 max-w-xl">
          {slide.subtitle}
        </p>
        <Link
          to={slide.link}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition text-sm md:text-base"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default HeroCarousel;
