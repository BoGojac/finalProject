// src/components/ui/DeleteConfirmationModal.jsx
import PropTypes from 'prop-types';
import Modal from './FormModal';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <Modal title="Confirm Deletion" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete <span className="font-semibold">{itemName}</span>? 
          This action cannot be undone.
        </p>
        
        <div className="pt-4 flex justify-end space-x-3">
          <button
            type="button" 
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 rounded-md text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
};

export default DeleteConfirmationModal;