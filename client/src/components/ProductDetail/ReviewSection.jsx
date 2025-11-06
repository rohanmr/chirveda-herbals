import React, { useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
  FaCamera,
} from "react-icons/fa";

const ReviewSection = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // handle local image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  return (
    <section className="mt-12 bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        Customer Reviews
        <FaCheckCircle className="text-green-500" />
      </h2>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Average Rating */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-5xl font-bold text-yellow-500 flex items-center gap-1">
            4.7 <FaStar className="text-yellow-500 text-3xl" />
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Based on 1,245 verified reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex flex-col gap-2 w-full max-w-sm">
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 text-sm text-gray-700">{star}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    star >= 4 ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                  style={{ width: `${star * 15}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          Share your experience
          <FaCamera className="text-green-500 text-xl" />
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload photos of your product
        </p>

        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
          <FaCamera className="mr-2 text-base" />
          Upload Photos
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* Uploaded images preview */}
        {uploadedImages.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {uploadedImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="review upload"
                className="w-full h-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
