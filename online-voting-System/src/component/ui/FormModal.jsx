// components/Modal.jsx
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      <div className="relative z-50 w-full max-w-4xl max-h-[90vh] bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl border border-white/30 overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;