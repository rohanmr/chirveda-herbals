import React from "react";
import { FaShippingFast, FaUndoAlt } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const ShippingReturnsInfo = () => {
  return (
    <div className="flex flex-row items-center md:justify-start gap-3 sm:gap-6 my-5 text-gray-700 text-sm">
      {/* Free Shipping */}
      <div className="flex items-center gap-1">
        <FaShippingFast className="text-green-600 text-xl " />
        <span className="font-medium text-center text-xs md:text-lg sm:text-left">
          Free Shipping over ₹499
        </span>
      </div>

      {/* Divider Dot */}
      {/* <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-400" /> */}

      {/* 7-day Returns */}
      <div className="flex items-center gap-1">
        <FaUndoAlt className="text-green-600 text-xl " />
        <span className="font-medium text-center text-xs md:text-lg sm:text-left">
          7-day Returns
        </span>
      </div>
      <div className="flex items-center gap-1">
        <MdSecurity className="text-green-600 text-xl " />
        <span className="font-medium text-center text-xs md:text-lg sm:text-left">
          Secure Payment
        </span>
      </div>
    </div>
  );
};

export default ShippingReturnsInfo;
