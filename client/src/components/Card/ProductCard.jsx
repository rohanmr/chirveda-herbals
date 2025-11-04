import React from "react";
import { FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

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
    // Navigate to checkout page with this product only
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

      {/* Buttons */}
      {isAvailable ? (
        <div className="flex gap-2">
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
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black-600 font-bold py-2.5 rounded-xl transition cursor-pointer"
          >
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition cursor-pointer"
          >
            BUY NOW
          </button>
        </div>
      ) : (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-600 font-bold py-2.5 rounded-xl cursor-not-allowed"
        >
          COMING SOON
        </button>
      )}
    </div>
  );
};

export default ProductCard;
