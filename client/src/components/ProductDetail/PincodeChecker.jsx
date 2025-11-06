import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const PincodeChecker = () => {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    if (!pincode) return;
    const isCOD = parseInt(pincode) % 2 === 0;
    setResult({
      eta: "Delivery in 3–5 days",
      cod: isCOD ? "COD Available" : "Prepaid Only",
    });
  };

  return (
    <div className="mt-6">
      <h4 className="text-gray-800 font-semibold mb-2">Check Availability</h4>
      <div className="flex gap-2">
        <div className="flex items-center border rounded-lg px-3 py-2 w-full md:w-56">
          <FaMapMarkerAlt className="text-green-600 mr-2" />
          <input
            type="number"
            placeholder="Enter Pincode"
            className="w-full outline-none"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <button
          onClick={handleCheck}
          className="bg-green-600 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-green-700 transition"
        >
          Check
        </button>
      </div>
      {result && (
        <p className="text-base text-gray-600 mt-2">
          {result.eta} • <span className="text-green-700">{result.cod}</span>
        </p>
      )}
    </div>
  );
};

export default PincodeChecker;
