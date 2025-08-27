// src/component/ServiceUnavailable.jsx
import { AlertTriangle } from "lucide-react";

const ServiceUnavailable = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-red-600 mb-2">
          Service Unavailable
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, this feature is under development or unavailable at the
          moment. Please check back later.
        </p>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl shadow-md hover:bg-red-700 transition"
        >
            Go Back        
        </button>
      </div>
    </div>
  );
};

export default ServiceUnavailable;
