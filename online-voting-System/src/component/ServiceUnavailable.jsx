// import React from 'react';

const ServiceUnavailable = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Service Unavailable</h2>
        <p className="text-gray-600">
          This feature is currently under development and will be available soon.
        </p>
      </div>
    </div>
  );
};

export default ServiceUnavailable;