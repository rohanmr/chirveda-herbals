import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import banner1 from "../../assets/images/imgfor.jpeg";
import banner2 from "../../assets/images/imgfor.jpeg";
import banner3 from "../../assets/images/imgfor.jpeg";
import banner4 from "../../assets/images/imgfor.jpeg";

export const heroSlides = [
  {
    id: 1,
    image: banner1,
    title: "Pure Aloe Vera Care",
    subtitle: "Nourish your skin naturally with organic freshness.",
    buttonText: "Shop Now",
    link: "/products",
  },
  {
    id: 2,
    image: banner2,
    title: "Nature in Every Drop",
    subtitle: "Rejuvenate your skin with natural aloe therapy.",
    buttonText: "Shop Now",
    link: "/products",
  },
  {
    id: 3,
    image: banner3,
    title: "Glow Naturally",
    subtitle: "Deep hydration and natural healing for your skin.",
    buttonText: "Shop Now",
    link: "/products",
  },
  {
    id: 4,
    image: banner4,
    title: "From Plant to Skin",
    subtitle: "100% pure, safe, and natural beauty essentials.",
    buttonText: "Shop Now",
    link: "/products",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden shadow-lg mb-12">
      {/* Slides Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="w-full shrink-0 relative h-[60vh] md:h-[75vh]"
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0  bg-opacity-40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg ">
                {slide.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-lg mb-6 max-w-xl">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition text-sm md:text-base"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === i
                ? "bg-green-500 scale-110"
                : "bg-white/70 hover:bg-green-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
