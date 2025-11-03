import React from "react";

const FeatureCard = ({ icon: Icon, title, description, gradient }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Icon */}
      <div
        className={`w-16 h-16 ${gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
      >
        <Icon className="text-white text-3xl" />
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
