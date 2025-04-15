//import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, alt = 'User', fallback = 'AU', className = '' }) => {
  return (
    <div
      className={`w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        fallback
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
