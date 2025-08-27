// src/pages/PrivacyPolicy.jsx
// import React from "react";
import PageHeader from "../component/ui/PageHeader";

const PrivacyPolicy = () => {
  return (
    <div>
      {/* Header */}
      <PageHeader title="Privacy Policy" />

      {/* Content */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-6 text-[#455883]">Our Privacy Policy</h2>
        <p className="mb-4 text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when using NEBE
          Vote.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">1. Information We Collect</h3>
        <p className="mb-4 text-gray-700">
          We may collect your name, email address, phone number, and usage data
          when you interact with our system.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">2. How We Use Your Information</h3>
        <p className="mb-4 text-gray-700">
          The data collected is used to provide services, improve our platform,
          communicate updates, and ensure election integrity.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">3. Data Protection</h3>
        <p className="mb-4 text-gray-700">
          We take appropriate security measures to protect your personal
          information from unauthorized access or disclosure.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">4. Contact Us</h3>
        <p className="text-gray-700">
          If you have any questions, contact us at{" "}
          <span className="font-medium">support@nebevote.com</span>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
