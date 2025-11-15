import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>At Chirveda Herbals, accessible from chirvedaherbals.com, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit or make a purchase from our website.</p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <ul className="list-disc list-inside">
        <li>Personal Information: Name, email, phone, billing/shipping address</li>
        <li>Payment Information: Collected securely via payment partners</li>
        <li>Device Information: IP, browser, cookies, pages viewed</li>
        <li>Order Information: Products purchased, order history</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside">
        <li>Process and fulfill orders</li>
        <li>Communicate order updates</li>
        <li>Improve website performance</li>
        <li>Send promotional emails (optional opt-out)</li>
        <li>Prevent fraud and secure transactions</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. Sharing Your Information</h2>
      <p>We do not sell personal data. We may share info with payment processors, delivery partners, or legal authorities when required.</p>

      <h2 className="text-2xl font-semibold mt-6">5. Data Security</h2>
      <p>We use secure servers and encryption methods to protect your data.</p>

      <h2 className="text-2xl font-semibold mt-6">6. Your Rights</h2>
      <p>You can request access, correction, deletion, or withdrawal of consent.</p>

      <h2 className="text-2xl font-semibold mt-6">7. Contact Us</h2>
      <p>Email: contact@chirvedaherbals.com</p>
    </div>
  );
}
