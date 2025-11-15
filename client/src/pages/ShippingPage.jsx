import React from "react";

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

      <h2 className="text-2xl font-semibold mt-6">1. Processing Time</h2>
      <p>Orders processed within 1–2 business days.</p>

      <h2 className="text-2xl font-semibold mt-6">2. Shipping Time</h2>
      <ul className="list-disc list-inside">
        <li>India: 7-15 business days</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. Shipping Charges</h2>
      <p>Shown at checkout.</p>

      <h2 className="text-2xl font-semibold mt-6">4. Order Tracking</h2>
      <p>Tracking ID sent after dispatch.</p>

      <h2 className="text-2xl font-semibold mt-6">5. Wrong Address</h2>
      <p>Customer must pay re-shipping charges for incorrect addresses.</p>

      <h2 className="text-2xl font-semibold mt-6">6. Lost/Damaged Shipment</h2>
      <p>Report within 48 hours with photos.</p>

      <h2 className="text-2xl font-semibold mt-6">7. Contact</h2>
      <p>Email: contact@chirvedaherbals.com</p>
    </div>
  );
}
