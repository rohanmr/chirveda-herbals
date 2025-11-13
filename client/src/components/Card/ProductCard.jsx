import React from "react";
import { FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  image,
  title,
  description,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  offerText,
  discountPercent,
  isAvailable,
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        buyNowProduct: {
          id,
          image,
          title,
          discountedPrice,
          originalPrice,
          offerText,
          quantity: 1,
        },
      },
    });
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 flex flex-col justify-between h-full">
      {/* Discount Badge */}
      <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
        {discountPercent} OFF
      </span>

      {/* Product Image */}
      <Link to={`/detail-page/${id}`}>
        <div className="flex justify-center items-center mb-4 h-56 sm:h-60">
          <img
            src={image}
            alt={title}
            className="object-contain max-h-full w-auto "
          />
        </div>
      </Link>
      {/* Product Info */}
      <div className="grow flex flex-col justify-between">
        <div>
          <Link to={`/detail-page/${id}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 text-center sm:text-left">
              {title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2 text-center sm:text-left">
            {description}
          </p>

          {/* Rating */}
          <div className="flex justify-center sm:justify-start items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
            <span className="text-gray-500 text-xs sm:text-sm ml-2">
              {rating} | {reviews} Reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-gray-400 line-through mr-2 text-sm">
                ₹{originalPrice}
              </span>
              <span className="text-lg font-bold text-green-600">
                ₹{discountedPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        {isAvailable ? (
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() =>
                addToCart({
                  id,
                  image,
                  title,
                  discountedPrice,
                  originalPrice,
                  offerText,
                  quantity: 1,
                })
              }
              className="flex-1 border-2 cursor-pointer border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-2.5 rounded-xl transition-all duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300  text-gray-600 font-bold py-2.5 rounded-xl cursor-not-allowed mt-auto"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
