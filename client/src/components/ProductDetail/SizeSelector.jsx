import React from "react";

const SizeSelector = ({ sizes, selectedSize, onChange }) => {
  return (
    <div className="mt-4">
      <h4 className="text-gray-800 font-semibold mb-2">Select Size</h4>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size.label}
            onClick={() => onChange(size)}
            className={`px-4 py-2 border rounded-lg cursor-pointer font-medium transition ${
              selectedSize.label === size.label
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 text-gray-700 hover:border-green-500"
            }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
