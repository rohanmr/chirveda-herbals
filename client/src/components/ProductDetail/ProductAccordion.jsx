import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductAccordion = ({ info }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        className="flex justify-between items-center w-full cursor-pointer font-semibold text-gray-800 text-lg"
        onClick={() => setOpen(!open)}
      >
        What’s on the Pack
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div className="mt-3 text-gray-600 text-sm space-y-1">
          <p>MRP: {info.mrp}</p>
          <p>Net Qty: {info.netQty}</p>
          <p>Batch No: {info.batchNo}</p>
          <p>Mfg Date: {info.mfg}</p>
          <p>Exp Date: {info.exp}</p>
          <p>Manufacturer: {info.manufacturer}</p>
        </div>
      )}
    </div>
  );
};

export default ProductAccordion;
