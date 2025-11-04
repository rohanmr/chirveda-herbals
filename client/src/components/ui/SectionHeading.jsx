import React from "react";

const SectionHeading = ({ title, highlight, subtitle }) => {
  return (
    <>
      <div className="text-center px-2 mb-10  mt-8 md:my-15">
        <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          {title} <span className="text-green-600">{highlight}</span>
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-green-500 to-lime-500 mx-auto rounded-full"></div>
        <p className="mt-6 text-base text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </>
  );
};

export default SectionHeading;
