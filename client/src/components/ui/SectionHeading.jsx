import React from "react";

const SectionHeading = ({ title, highlight, subtitle }) => {
  return (
    <>
      <div class="text-center mb-16 mt-10 md:mt-15">
        <h2 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          {title} <span class="text-green-600">{highlight}</span>
        </h2>
        <div class="w-24 h-1 bg-linear-to-r from-green-500 to-lime-500 mx-auto rounded-full"></div>
        <p class="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      </div>
    </>
  );
};

export default SectionHeading;
