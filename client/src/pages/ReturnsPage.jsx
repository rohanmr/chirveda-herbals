import React from "react";

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Returns & Refunds Policy</h1>

      <h2 className="text-2xl font-semibold mt-6">1. Eligibility for Returns</h2>
      <p>Returns accepted only for damaged, defective, or incorrect items reported within 48 hours.</p>

      <h2 className="text-2xl font-semibold mt-6">2. Non-Returnable Items</h2>
      <ul className="list-disc list-inside">
        <li>Used products</li>
        <li>Opened products</li>
        <li>Items damaged due to customer misuse</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. Refund Process</h2>
      <p>Refunds within 5–10 business days after approval.</p>

      <h2 className="text-2xl font-semibold mt-6">4. Return Shipping</h2>
      <p>Covered by us only for damaged/incorrect products.</p>

      <h2 className="text-2xl font-semibold mt-6">5. How to Initiate a Return</h2>
      <p>Email: contact@chirvedaherbals.com with photos, order ID, and issue description.</p>
    </div>
  );
}
