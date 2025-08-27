// src/pages/TermsOfService.jsx
// import React from "react";
import PageHeader from "../component/ui/PageHeader";

const TermsOfService = () => {
  return (
    <div>
      {/* Header */}
      <PageHeader title="Terms of Service" />

      {/* Content */}
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold mb-6 text-[#455883]">Our Terms of Service</h2>
        <p className="mb-4 text-gray-700">
          These Terms of Service govern your use of NEBE Vote. By using our
          system, you agree to comply with these terms.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">1. Use of Services</h3>
        <p className="mb-4 text-gray-700">
          You agree to use our platform only for lawful purposes and in
          compliance with all applicable laws and regulations.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">2. User Responsibilities</h3>
        <p className="mb-4 text-gray-700">
          You are responsible for maintaining the confidentiality of your
          account and ensuring that your activities do not harm the system or
          other users.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">3. Limitation of Liability</h3>
        <p className="mb-4 text-gray-700">
          NEBE Vote shall not be liable for damages caused by misuse, downtime,
          or unauthorized access.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">4. Changes to Terms</h3>
        <p className="mb-4 text-gray-700">
          We may update these Terms at any time. Continued use of the system
          after changes means you accept the new terms.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">5. Contact Us</h3>
        <p className="text-gray-700">
          For questions, reach us at{" "}
          <span className="font-medium">support@nebevote.com</span>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
