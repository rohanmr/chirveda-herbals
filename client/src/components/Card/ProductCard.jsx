import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({
  image,
  title,
  description,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  offerText,
  discountPercent,
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100">
      {/* Offer Tag */}
      <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
        {offerText}
      </span>

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-contain mb-4"
      />

      {/* Title and Description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{description}</p>

      {/* Rating Section */}
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}

        <span className="text-gray-500 text-sm ml-2">
          {rating} | {reviews} Reviews
        </span>
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-gray-400 line-through mr-2">
            ₹{originalPrice}
          </span>
          <span className="text-lg font-bold text-green-600">
            ₹{discountedPrice}
          </span>
        </div>
        <span className="text-green-600 text-sm font-semibold">
          {discountPercent} OFF
        </span>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 cursor-pointer rounded-xl transition">
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
