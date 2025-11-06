import React from "react";

const StickyBar = ({ price, title }) => {
  return (
    <div className="fixed bottom-0 z-50 left-0 w-full bg-white shadow-lg p-4 flex justify-between items-center md:hidden border-t">
      <div>
        <p className="text-base">{title}</p>
        <p className="text-green-700 font-bold text-lg">₹{price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Inclusive of all taxes</p>
      </div>
      <button className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
        Add to Cart
      </button>
    </div>
  );
};

export default StickyBar;
