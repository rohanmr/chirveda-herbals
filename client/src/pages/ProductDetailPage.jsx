import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import products from "../data/productsData.js"; // your file name
import SizeSelector from "../components/ProductDetail/SizeSelector";
import PincodeChecker from "../components/ProductDetail/PincodeChecker";
import ProductAccordion from "../components/ProductDetail/ProductAccordion";
import StickyBar from "../components/ProductDetail/StickyBar";
import ShippingReturnsInfo from "../components/ProductDetail/ShippingReturnsInfo.jsx";
import ReviewSection from "../components/ProductDetail/ReviewSection.jsx";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(0);

  // ✅ Get product dynamically based on ID
  useEffect(() => {
    const selectedProduct = products.find((item) => item.id === parseInt(id));
    if (selectedProduct) {
      setProductData(selectedProduct);
      if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
        setSelectedSize(selectedProduct.sizes[0]);
        setPrice(selectedProduct.basePrice);
      } else {
        setPrice(selectedProduct.discountedPrice);
      }
    }
  }, [id]);

  if (!productData) {
    return (
      <p className="text-center py-20 text-gray-600">Loading product...</p>
    );
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setPrice(productData.basePrice * size.multiplier);
  };

  const perGram =
    selectedSize && selectedSize.label
      ? (price / parseInt(selectedSize.label)).toFixed(2)
      : null;

  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Section - Images */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={productData.images?.[0] || productData.image}
            alt={productData.title}
            className="rounded-2xl shadow-md w-full max-w-md object-contain"
          />
          {productData.images && productData.images.length > 1 && (
            <div className="flex space-x-3">
              {productData.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Thumbnail"
                  className="w-20 h-20 rounded-lg border border-gray-300 hover:border-green-600 object-cover cursor-pointer transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Section - Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {productData.title}
          </h1>
          <p className="text-gray-600 mb-3">{productData.description}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.round(productData.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500">
              {productData.rating} ({productData.reviews} Reviews)
            </span>
          </div>
          {/* Price */}
          <div className="mt-4">
            <div className="flex items-baseline space-x-3">
              <p className="text-3xl font-bold text-green-700">
                ₹{price.toFixed(2)}
              </p>
              {perGram && (
                <p className="text-gray-500 text-sm">({perGram} / g)</p>
              )}
            </div>
          </div>

          {/*  Size Selector */}
          {productData.sizes && (
            <SizeSelector
              sizes={productData.sizes}
              selectedSize={selectedSize}
              onChange={handleSizeChange}
            />
          )}

          {/* Pincode Checker */}
          <div className="mt-4">
            <PincodeChecker />
          </div>
          <ShippingReturnsInfo />
          {/* Add to Cart / Buy Now */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 bg-green-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Add to Cart
            </button>
            <button className="flex-1 border cursor-pointer border-green-600 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
              Buy Now
            </button>
          </div>

          {/*Product Details Accordion */}
          {productData.whatsOnPack && (
            <div className="mt-8">
              <ProductAccordion info={productData.whatsOnPack} />
            </div>
          )}

          <ReviewSection />
        </div>
      </div>

      {/* Sticky Add-to-Cart Bar (Mobile) */}
      <StickyBar price={price} title={productData.title} />
    </section>
  );
};

export default ProductDetailPage;
